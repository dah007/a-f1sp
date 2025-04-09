-- f1sp.`race-latest-year` source
create or replace
algorithm = UNDEFINED view `race-latest-year` as
select
    max(`r`.`year`) as `year`
from
    (`race_data` `rd`
join `race` `r` on
    ((`rd`.`race_id` = `r`.`id`)))
where
    (`rd`.`type` = 'RACE_RESULT');