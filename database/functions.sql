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

create function get_user_info(u_id int)
    return USERS_INFO%rowtype
as
    result USERS_INFO%rowtype;
begin
    select * into result from USERS_INFO where USER_ID = u_id;
    return result;
exception
    when NO_DATA_FOUND then
        raise_application_error(-20001, 'user not found');
        return null;
end;
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