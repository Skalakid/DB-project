-- Models:
insert into MODEL(model_id, length_m, width_m, weight_kg)
values ('A1', 1.42, 0.65, 10.2);

insert into MODEL(model_id, length_m, width_m, weight_kg)
values ('A2', 1.48, 0.66, 11.5);

insert into MODEL(model_id, length_m, width_m, weight_kg)
values ('AS1', 1.27, 0.6, 8.1);

insert into MODEL(model_id, length_m, width_m, weight_kg)
values ('AS2', 1.33, 0.6, 8.5);

insert into MODEL(model_id, length_m, width_m, weight_kg)
values ('S1', 1.20, 0.58, 7.5);

insert into MODEL(model_id, length_m, width_m, weight_kg)
values ('S2', 1.23, 0.6, 7.9);

insert into MODEL(model_id, length_m, width_m, weight_kg)
values ('S3', 1.23, 0.6, 8.0);

insert into MODEL(model_id, length_m, width_m, weight_kg)
values ('XA9', 1.62, 0.68, 11.7);

insert into MODEL(model_id, length_m, width_m, weight_kg)
values ('PRO', 1.67, 0.72, 14.2);

-- Batteries:
insert into BATTERY(battery_code, max_duration)
values ('STD73', interval '18:40' hour to minute );

insert into BATTERY(battery_code, max_duration)
values ('STD85', interval '22:30' hour to minute);

insert into BATTERY(battery_code, max_duration)
values ('XAM111', interval '28:10' hour to minute);

insert into BATTERY(battery_code, max_duration)
values ('LPT07', interval '11:40' hour to minute);

insert into BATTERY(battery_code, max_duration)
values ('PIWO333', interval '04:30' hour to minute);

insert into BATTERY(battery_code, max_duration)
values ('XN239', interval '40' hour);

insert into BATTERY(battery_code, max_duration)
values ('XN771A', interval '32:30' hour to minute);

insert into BATTERY(battery_code, max_duration)
values ('PT5714', interval '02:30' hour to minute);

-- Vehicles
insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('A1', 'STD73', 50.06934, 19.90886, 'Available', 100, 0.3);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('A1', 'STD73', 50.06999, 19.90410, 'Available', 100, 0.3);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('A1', 'STD73', 50.06479, 19.90622, 'Available', 82, 0.3);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('A1', 'STD73', 50.06275, 19.91747, 'Available', 95, 0.3);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('A1', 'STD85', 50.06476, 19.92945, 'Available', 15, 0.35);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('A2', 'STD85', 50.05949, 19.92236, 'Available', 0, 0.4);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('A2', 'STD85', 50.06881, 19.89440, 'Not available', 80, 0.4);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('S1', 'LPT07', 50.08025, 19.91894, 'Available', 71, 0.02);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('S1', 'LPT07', 50.7150, 19.91185, 'Available', 100, 0.02);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('S1', 'LPT07', 50.05769, 19.90625, 'Not available', 100, 0.02);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('S1', 'XAM111', 50.01729, 19.9187, 'Available', 45, 0.02);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('S1', 'LPT07', 50.05659, 20.15987, 'Available', 100, 0.02);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('S3', 'PT5714', 50.06247, 19.93506, 'Available', 100, 0.01);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('S3', 'STD85', 50.07148, 19.92959, 'Not available', 64, 0.02);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('S3', 'STD85', 50.06631, 19.92012, 'Available', 0, 0.02);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('XA9', 'XN771A', 50.07451, 19.90861, 'Available', 100, 0.5);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('XA9', 'XN771A', 50.05475, 19.89375, 'Available', 3, 0.5);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('XA9', 'XN239', 50.06894, 19.92620, 'Available', 28, 0.5);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('AS2', 'XN239', 50.06891, 19.90722, 'Available', 100, 0.0001);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('PRO', 'XN239', 50.05907, 19.93933, 'Available', 90, 0.8);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('PRO', 'XN239', 50.05914, 19.95411, 'Available', 0, 0.8);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('PRO', 'XN239', 50.06599, 19.94098, 'Available', 100, 0.8);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('AS2', 'PT5714', 50.06988, 19.94504, 'Available', 20, 0.005);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('AS2', 'PT5714', 50.05535, 19.92766, 'Available', 2, 0.005);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('AS2', 'PT5714', 50.07278, 19.92274, 'Not available', 100, 0.005);

insert into VEHICLE(model_id, battery_code, lat_cords, lng_cords, status, energy_level, cost_per_minute)
values ('PRO', 'PIWO333', 50.06880, 19.90621, 'Available', 100, 1);

-- Users:
insert into USERS(firstname, lastname, e_mail, phone)
values ('Igor', 'Swat', 'igorswat2002@o2.pl', '123456789');

insert into USERS(firstname, lastname, e_mail, phone)
values ('Adam', 'Nowak', 'deer1324@gmail.com', '764264555');

insert into USERS(firstname, lastname, e_mail, phone)
values ('Marek', 'Garucha', 'mgarucha@onet.pl', null);

insert into USERS(firstname, lastname, e_mail, phone)
values ('Baran', 'Adamski', 'bialykot00@gmail.com', '671437561');

insert into USERS(firstname, lastname, e_mail, phone)
values ('Robert', 'Robcio', 'robbi@gmail.com', null);

-- Reservations
insert into RESERVATION(user_id, vehicle_id, r_begin, r_end)
values (21, 22, to_date('2022-08-15 16:44:21', 'YYYY-MM-DD HH24:MI:SS'),
        to_date('2022-08-15 16:54:21', 'YYYY-MM-DD HH24:MI:SS'));

insert into RESERVATION(user_id, vehicle_id, r_begin, r_end)
values (21, 28, to_date('2023-03-10 09:25:21', 'YYYY-MM-DD HH24:MI:SS'),
        to_date('2023-03-10 09:55:21', 'YYYY-MM-DD HH24:MI:SS'));

insert into RESERVATION(user_id, vehicle_id, r_begin, r_end)
values (23, 38, to_date('2023-02-17 23:58:21', 'YYYY-MM-DD HH24:MI:SS'),
        to_date('2023-02-18 00:18:21', 'YYYY-MM-DD HH24:MI:SS'));

insert into RESERVATION(user_id, vehicle_id, r_begin, r_end)
values (24, 39, to_date('2023-04-22 18:09:21', 'YYYY-MM-DD HH24:MI:SS'),
        to_date('2023-04-30 16:54:21', 'YYYY-MM-DD HH24:MI:SS'));

insert into RESERVATION(user_id, vehicle_id, r_begin, r_end)
values (21, 46, to_date('2023-03-30 13:20:00', 'YYYY-MM-DD HH24:MI:SS'),
        to_date('2023-03-30 13:40:00', 'YYYY-MM-DD HH24:MI:SS'));

insert into RESERVATION(user_id, vehicle_id, r_begin, r_end)
values (24, 21, to_date('2022-08-15 18:44:21', 'YYYY-MM-DD HH24:MI:SS'),
        to_date('2022-08-15 18:59:21', 'YYYY-MM-DD HH24:MI:SS'));

insert into RESERVATION(user_id, vehicle_id, r_begin, r_end)
values (25, 43, to_date('2023-04-22 16:44:21', 'YYYY-MM-DD HH24:MI:SS'),
        to_date('2023-04-25 16:44:21', 'YYYY-MM-DD HH24:MI:SS'));

insert into RESERVATION(user_id, vehicle_id, r_begin, r_end)
values (23, 22, to_date('2023-02-11 13:58:21', 'YYYY-MM-DD HH24:MI:SS'),
        to_date('2023-02-11 14:23:21', 'YYYY-MM-DD HH24:MI:SS'));