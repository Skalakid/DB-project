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

create type IGOREK.USER_RESERVATION_TABLE as table of USER_RESERVATION
/

create type IGOREK.USER_RESERVATION2_TABLE as table of USER_RESERVATION2
/