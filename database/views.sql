create view VEHICLES_TO_CHARGE as
select VEHICLE_ID, BATTERY_CODE, LAT_CORDS, LNG_CORDS
    from VEHICLE
    where ENERGY_LEVEL = 0
/

create view VEHICLES as
select v.VEHICLE_ID, v.MODEL_ID, m.LENGTH_M, m.WIDTH_M, m.WEIGHT_KG,
           b.BATTERY_CODE, b.MAX_DURATION, v.COST_PER_MINUTE, v.STATUS
    from VEHICLE v
    join MODEL m
    on v.MODEL_ID = m.MODEL_ID
    join BATTERY b
    on v.BATTERY_CODE = b.BATTERY_CODE
/

create view CURRENT_RESERVATIONS as
select r.RESERVATION_ID, u.USER_ID, u.FIRSTNAME, u.LASTNAME, u.E_MAIL, r.VEHICLE_ID, r.r_BEGIN, r.r_END
    from RESERVATION r
    join USERS u
    on r.USER_ID = u.USER_ID
    where sysdate between r.R_BEGIN and r.R_END
/

create view AVAILABLE_VEHICLES as
select v.VEHICLE_ID, v.MODEL_ID, v.LAT_CORDS, v.LNG_CORDS, b.MAX_DURATION * v.ENERGY_LEVEL / 100 as duration,
       v.ENERGY_LEVEL, v.COST_PER_MINUTE
    from VEHICLE v
    join BATTERY b
    on v.BATTERY_CODE = b.BATTERY_CODE
    left join CURRENT_RESERVATIONS cr
    on v.VEHICLE_ID = cr.VEHICLE_ID
    where cr.VEHICLE_ID is null and v.STATUS like 'Available' and v.ENERGY_LEVEL > 0
/

create or replace view UNAVAILABLE_VEHICLES as
select v.VEHICLE_ID, v.MODEL_ID, v.LAT_CORDS, v.LNG_CORDS, b.MAX_DURATION * v.ENERGY_LEVEL / 100 as duration,
       v.ENERGY_LEVEL, v.COST_PER_MINUTE
    from VEHICLE v
    join BATTERY b
    on v.BATTERY_CODE = b.BATTERY_CODE
    left join CURRENT_RESERVATIONS cr
    on v.VEHICLE_ID = cr.VEHICLE_ID
    where cr.VEHICLE_ID is null and v.STATUS like 'Not available'
/

create view RESERVATIONS as
select r.RESERVATION_ID, r.USER_ID, r.VEHICLE_ID, r.R_BEGIN, r.R_END,
           ((extract(day from CAST(r.R_END as timestamp)) -
                extract(day from CAST(r.R_BEGIN as timestamp))) * 24 * 60 +
           (extract(hour from CAST(r.R_END as timestamp)) -
                extract(hour from CAST(r.R_BEGIN as timestamp))) * 60 +
           (extract(minute from CAST(r.R_END as timestamp)) -
                extract(minute from CAST(r.R_BEGIN as timestamp)))) * v.COST_PER_MINUTE as cost
    from RESERVATION r
    join VEHICLE v
    on r.VEHICLE_ID = v.VEHICLE_ID
/

create view USERS_STATS as
select u.USER_ID, count(r.USER_ID) as no_reservations, nvl(sum(r.COST), 0) as total_cost
    from USERS u
    left join RESERVATIONS r
    on u.USER_ID = r.USER_ID
    group by u.USER_ID
/

create view USERS_INFO as
select u.USER_ID, u.FIRSTNAME, u.LASTNAME, u.E_MAIL, u.PHONE, us.NO_RESERVATIONS, us.TOTAL_COST
    from USERS u
    join USERS_STATS us
    on u.USER_ID = us.USER_ID
/

create view VEHICLE_MODELS as
select m.MODEL_ID, m.LENGTH_M, m.WIDTH_M, m.WEIGHT_KG, count(v.VEHICLE_ID) as total_vehicles
    from MODEL m
    left join VEHICLE v
    on m.MODEL_ID = v.MODEL_ID
    group by m.MODEL_ID, m.LENGTH_M, m.WIDTH_M, m.WEIGHT_KG
/

create or replace view RENTED_VEHICLES as
SELECT USER_ID, v.VEHICLE_ID, v.MODEL_ID, v.LAT_CORDS, v.LNG_CORDS, b.MAX_DURATION * v.ENERGY_LEVEL / 100 as duration,
v.ENERGY_LEVEL, v.COST_PER_MINUTE FROM CURRENT_RESERVATIONS INNER JOIN VEHICLE V
on CURRENT_RESERVATIONS.VEHICLE_ID = V.VEHICLE_ID join BATTERY b
on v.BATTERY_CODE = b.BATTERY_CODE
/