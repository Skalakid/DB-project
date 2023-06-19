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

create procedure add_vehicle(modelID varchar2, batteryCode varchar2, lat float, lng float, vehicleStatus varchar2, energyLvl int, costPerMinute float) as
b_count pls_integer;
begin
    select count(*) into b_count from BATTERY B where BATTERY_CODE = batteryCode;
    if b_count = 0 then
        raise_application_error(-20004, 'No such a battery');
    end if;

    insert into VEHICLE(MODEL_ID, BATTERY_CODE, LAT_CORDS, LNG_CORDS, STATUS, ENERGY_LEVEL, COST_PER_MINUTE)
    values (modelID, batteryCOde, lat, lng, vehicleStatus, energyLvl, costPerMinute);
end;
/

create PROCEDURE toggle_vehicle_status(
    p_vehicleId IN NUMBER
)
AS
    v_vehicleState VARCHAR2(20);
BEGIN
    SELECT STATUS
    INTO v_vehicleState
    FROM vehicles
    WHERE vehicle_id = p_vehicleId;

    IF v_vehicleState = 'Available' THEN
        UPDATE vehicles
        SET STATUS = 'Not available'
        WHERE vehicle_id = p_vehicleId;
    ELSE
        UPDATE vehicles
        SET STATUS = 'Available'
        WHERE vehicle_id = p_vehicleId;
    END IF;
END;
/

