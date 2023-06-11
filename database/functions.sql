create function user_exist_by_id(u_id int)
    return boolean
as
    found int;
begin
    select count(*) into found from USERS where USER_ID = u_id;
    if found = 0 then
        return false;
    else
        return true;
    end if;
end;
/

create function user_exist_by_auth(email varchar2, paswd varchar2)
    return boolean
as
    found int;
begin
    select count(*) into found from USERS where E_MAIL = email and PASSWORD = paswd;
    if found = 0 then
        return false;
    else
        return true;
    end if;
end;
/

create function get_user_id(email varchar2, paswd varchar2)
    return int
as
    u_id int;
begin
    select USER_ID into u_id from USERS where E_MAIL = email and PASSWORD = paswd;
    return u_id;
exception
    when NO_DATA_FOUND then
        raise_application_error(-20001, 'user not found');
        return -1;
end;
/

CREATE OR REPLACE FUNCTION get_user_info(u_id INT)
    RETURN USER_STATS_TABLE
AS
    result USER_STATS_TABLE;
BEGIN
    select USER_STATS(u.USER_ID, u.FIRSTNAME, u.LASTNAME, u.E_MAIL, u.PHONE, u.NO_RESERVATIONS, u.TOTAL_COST)
    bulk collect into result
    from USERS_INFO u
    where USER_ID = u_id;
    return result;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20001, 'user not found');
        RETURN null;
END;
/

create function get_user_all_reservations(u_id int)
    return USER_RESERVATION_TABLE
as
    result USER_RESERVATION_TABLE;
begin
    select USER_RESERVATION(r.USER_ID, r.RESERVATION_ID, r.VEHICLE_ID, r.R_BEGIN, r.R_END, r.COST)
    bulk collect into result
    from RESERVATIONS r
    where USER_ID = u_id;
    return result;
end;
/

create function get_user_current_reservations(u_id int)
    return USER_RESERVATION2_TABLE
as
    result USER_RESERVATION2_TABLE;
begin
    select USER_RESERVATION2(cr.RESERVATION_ID, cr.VEHICLE_ID, cr.R_BEGIN, cr.R_END)
    bulk collect into result
    from CURRENT_RESERVATIONS cr
    where cr.USER_ID = u_id;
    return result;
end;
/

create function get_reservations_by_vehicle(v_id int)
    return USER_RESERVATION_TABLE
as
    result USER_RESERVATION_TABLE;
begin
    select USER_RESERVATION(r.USER_ID, r.RESERVATION_ID, r.VEHICLE_ID, r.R_BEGIN, r.R_END, r.COST)
    bulk collect into result
    from RESERVATIONS r
    where VEHICLE_ID = v_id;
    return result;
end;
/

create function vehicle_exist(v_id int)
    return boolean
as
    result int;
begin
    select count(*) into result from VEHICLE where VEHICLE_ID = v_id;
    if result = 0 then
        return false;
    else
        return true;
    end if;
end;
/

create function vehicles_in_area(lat_min real, lng_min real, lat_max real, lng_max real)
    return VEHICLE_DATA_TABLE
as
    result VEHICLE_DATA_TABLE;
begin
    select VEHICLE_DATA(av.VEHICLE_ID, av.MODEL_ID, av.LAT_CORDS, av.LNG_CORDS, av.DURATION,
        av.ENERGY_LEVEL, av.COST_PER_MINUTE) bulk collect into result
    from AVAILABLE_VEHICLES av
    where (av.LAT_CORDS between lat_min and lat_max)
        and (av.LNG_CORDS between lng_min and lng_max);
    return result;
end;
/

create function vehicles_by_model(m_id varchar2)
    return VEHICLE_DATA_TABLE
as
    result VEHICLE_DATA_TABLE;
begin
    select VEHICLE_DATA(av.VEHICLE_ID, av.MODEL_ID, av.LAT_CORDS, av.LNG_CORDS, av.DURATION,
        av.ENERGY_LEVEL, av.COST_PER_MINUTE) bulk collect into result
    from AVAILABLE_VEHICLES av
    where av.MODEL_ID = m_id;
    return result;
end;
/

create function vehicles_by_price(price_min real, price_max real)
    return VEHICLE_DATA_TABLE
as
    result VEHICLE_DATA_TABLE;
begin
    select VEHICLE_DATA(av.VEHICLE_ID, av.MODEL_ID, av.LAT_CORDS, av.LNG_CORDS, av.DURATION,
        av.ENERGY_LEVEL, av.COST_PER_MINUTE) bulk collect into result
    from AVAILABLE_VEHICLES av
    where av.COST_PER_MINUTE between price_min and price_max;
    return result;
end;
/

create function vehicle_info(v_id int)
    return VEHICLES%rowtype
as
    result VEHICLES%rowtype;
    exc1 exception;
begin
    if not VEHICLE_EXIST(v_id) then
        raise exc1;
    end if;
    select * into result
    from VEHICLES v
    where v.VEHICLE_ID = v_id;
    return result;
exception
    when exc1 then
        raise_application_error(-20002, 'vehicle not found');
        return null;
end;
/