create type user_reservation as object
(
    user_id int,
    reservation_id int,
    vehicle_id int,
    r_begin date,
    r_end date,
    cost real
)
/

create type user_reservation2 as object
(
    reservation_id int,
    vehicle_id int,
    r_begin date,
    r_end date
)
/

create type vehicle_data as object
(
    vehicle_id int,
    model_id varchar2(5),
    lat_cords real,
    lng_cords real,
    duration interval day to second,
    energy_level int,
    cost_per_minute real
);

create type USER_RESERVATION_TABLE as table of USER_RESERVATION
/

create type USER_RESERVATION2_TABLE as table of USER_RESERVATION2
/

create type vehicle_data_table is table of vehicle_data;