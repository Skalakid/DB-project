create table USERS
(
    USER_ID   NUMBER generated as identity
        constraint USERS_PK
            primary key,
    FIRSTNAME VARCHAR2(50) not null,
    LASTNAME  VARCHAR2(50) not null,
    E_MAIL    VARCHAR2(50) not null
        constraint USERS_CHK1
            check (e_mail like '%@%'),
    PHONE     VARCHAR2(12)
        constraint USERS_CHK2
            check (regexp_like(PHONE, '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')),
    PASSWORD  VARCHAR2(20)
        constraint USERS_CHK3
            check (LENGTH(PASSWORD) > 5)
)
/

create table BATTERY
(
    BATTERY_CODE VARCHAR2(10)                 not null
        constraint BATTERY_PK
            primary key,
    MAX_DURATION INTERVAL DAY(2) TO SECOND(6) not null
        constraint BATTERY_CHK1
            check (max_duration > interval '0' second)
)
/

create table MODEL
(
    MODEL_ID  VARCHAR2(5) not null
        constraint MODEL_PK
            primary key,
    LENGTH_M  FLOAT(63)   not null
        constraint MODEL_CHK1
            check (LENGTH_M > 0),
    WIDTH_M   FLOAT(63)   not null
        constraint MODEL_CHK2
            check (WIDTH_M > 0),
    WEIGHT_KG FLOAT(63)   not null
        constraint MODEL_CHK3
            check (WEIGHT_KG > 0)
)
/

create table VEHICLE
(
    VEHICLE_ID      NUMBER generated as identity
        constraint VEHICLES_PK
            primary key,
    MODEL_ID        VARCHAR2(5)  not null
        constraint VEHICLES_FK1
            references MODEL,
    BATTERY_CODE    VARCHAR2(10) not null
        constraint VEHICLES_FK2
            references BATTERY,
    LAT_CORDS       FLOAT(63)    not null
        constraint VEHICLES_CHK1
            check (LAT_CORDS between -90 and 90),
    LNG_CORDS       FLOAT(63)    not null
        constraint VEHICLES_CHK2
            check (LNG_CORDS between -180 and 180),
    STATUS          VARCHAR2(20) not null
        constraint VEHICLES_CHK4
            check (STATUS in ('Available', 'Not available')),
    ENERGY_LEVEL    NUMBER       not null
        constraint VEHICLES_CHK3
            check (ENERGY_LEVEL between 0 and 100),
    COST_PER_MINUTE NUMBER(4, 2) not null
        constraint VEHICLES_CHK5
            check (COST_PER_MINUTE >= 0)
)
/

create table RESERVATION
(
    RESERVATION_ID NUMBER generated as identity
        constraint RESERVATION_PK
            primary key,
    USER_ID        NUMBER       not null
        constraint RESERVATION_FK1
            references USERS,
    VEHICLE_ID     NUMBER       not null
        constraint RESERVATION_FK2
            references VEHICLE,
    BEGIN          TIMESTAMP(6) not null,
    END            TIMESTAMP(6) not null,
    constraint RESERVATION_CHK1
        check (BEGIN < END)
)