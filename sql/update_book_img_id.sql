create sequence id_seq;
update book  
  set img_id = nextval('id_seq');
drop sequence id_seq;