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

create or replace type user_stats as object
(
    USER_ID int,
    FIRSTNAME varchar2(50),
    LASTNAME varchar2(50),
    E_MAIL varchar2(50),
    PHONE varchar2(12),
    NO_RESERVATIONS int,
    TOTAL_COST float
)
/

create or replace type USER_STATS_TABLE as table of user_stats
/

create type USER_RESERVATION_TABLE as table of USER_RESERVATION
/

create type USER_RESERVATION2_TABLE as table of USER_RESERVATION2
/

create type vehicle_data_table is table of vehicle_data;