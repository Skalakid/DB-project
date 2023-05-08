create procedure add_user(fname varchar2, lname varchar2, email varchar2, paswd varchar2, phone_num varchar2)
as
begin
    if email not like '%@%' then
        raise_application_error(-20003, 'incorrect e-mail address');
    end if;
    insert into USERS(firstname, lastname, e_mail, phone, password)
    values (fname, lname, email, phone_num, paswd);
exception
    when DUP_VAL_ON_INDEX then
        raise_application_error(-20004, 'e-mail address already in use');
end;
/

create procedure set_vehicle_status(v_id int, p_status varchar2)
as
begin
    if not VEHICLE_EXIST(v_id) then
        raise_application_error(-20002, 'vehicle not found');
    end if;
    if p_status not in ('Available', 'Not available') then
        raise_application_error(-20005, 'incorrect status');
    end if;
    update VEHICLE v
    set v.STATUS = p_status
    where v.VEHICLE_ID = v_id;
end;
/

create procedure add_reservation(u_id int, v_id int, p_duration interval day to second)
as
begin
    if not USER_EXIST_BY_ID(u_id) then
        raise_application_error(-20001, 'user not found');
    end if;
    if  not VEHICLE_EXIST(v_id) then
        raise_application_error(-20002, 'vehicle not found');
    end if;
    insert into RESERVATION(user_id, vehicle_id, r_begin, r_end)
    values (u_id, v_id, current_date, current_date + p_duration);
end;
/

create procedure set_energy_by_value(v_id int, e_lvl int)
as
begin
    if not VEHICLE_EXIST(v_id) then
        raise_application_error(-20002, 'vehicle not found');
    end if;
    if not e_lvl between 0 and 100 then
        raise_application_error(-20006, 'invalid energy level');
    end if;
    update VEHICLE v
    set v.ENERGY_LEVEL = e_lvl
    where v.VEHICLE_ID = v_id;
end;
/

create procedure set_energy_by_duration(v_id int, p_duration interval day to second)
as
    real_duration interval day to second;
    m_duration interval day to second;
    new_energy int;
    vehicle_data AVAILABLE_VEHICLES%rowtype;
begin
    select * into vehicle_data
    from AVAILABLE_VEHICLES av
    where av.VEHICLE_ID = v_id;
    if vehicle_data.DURATION <= p_duration then
        real_duration := interval '0 00:00:00' day to second;
    else
        real_duration := vehicle_data.DURATION - p_duration;
    end if;
    select v.MAX_DURATION into m_duration
    from VEHICLES v
    where v.VEHICLE_ID = v_id;
    new_energy := 100 * (extract(day from real_duration) * 24 * 60 * 60 +
                               extract(hour from real_duration) * 60 * 60 +
                               extract(minute from real_duration) * 60 +
                               extract(second from real_duration)) / (extract(day from m_duration) * 24 * 60 * 60 +
                                 extract(hour from m_duration) * 60 * 60 +
                                 extract(minute from m_duration) * 60 +
                                 extract(second from m_duration));
    update VEHICLE
    set ENERGY_LEVEL = new_energy
    where VEHICLE_ID = v_id;
exception
    when NO_DATA_FOUND then
        raise_application_error(-20002, 'vehicle not found');
end;
/

create procedure add_reservation_with_update(u_id int, v_id int, p_duration interval day to second)
as
begin
    if not USER_EXIST_BY_ID(u_id) then
        raise_application_error(-20001, 'user not found');
    end if;
    if  not VEHICLE_EXIST(v_id) then
        raise_application_error(-20002, 'vehicle not found');
    end if;
    SET_ENERGY_BY_DURATION(v_id, p_duration);
    insert into RESERVATION(user_id, vehicle_id, r_begin, r_end)
    values (u_id, v_id, current_date, current_date + p_duration);
end;
/

create procedure add_vehicle(m_id varchar2, b_code varchar2, lat real, lng real, energy int, cost real)
as
    model varchar2(5);
    battery varchar2(10);
begin
    select m.MODEL_ID into model from MODEL m where m.MODEL_ID = m_id;
    select b.BATTERY_CODE into battery from BATTERY b where b.BATTERY_CODE = b_code;
    if lat < -90 or lat > 90 then
        raise_application_error(-20008, 'Incorrect LAT coordinate value');
    end if;
    if lng < -180 or lng > 180 then
        raise_application_error(-20009, 'Incorrect LNG coordinate value');
    end if;
    if energy < 0 or energy > 100 then
        raise_application_error(-20010, 'Incorrect energy value');
    end if;
    if cost < 0 then
        raise_application_error(-20011, 'Cost can not be a negative value');
    end if;
    insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
    values (m_id, b_code, lat, lng, 'Available', energy, cost);
exception
    when NO_DATA_FOUND then
        raise_application_error(-20007, 'Not existing battery & model arguments');
end;
/

create procedure update_cords(v_id int, lat real, lng real)
as
begin
    if not VEHICLE_EXIST(v_id) then
        raise_application_error(-20002, 'vehicle not found');
    end if;
    if lat < -90 or lat > 90 then
        raise_application_error(-20008, 'Incorrect LAT coordinate value');
    end if;
    if lng < -180 or lng > 180 then
        raise_application_error(-20009, 'Incorrect LNG coordinate value');
    end if;
    update VEHICLE v
    set v.LAT_CORDS = lat, v.LNG_CORDS = lng
    where v.VEHICLE_ID = v_id;
end;