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