-- f1sp.`fastest-pitstop-since-2000` source

create or replace
algorithm = UNDEFINED view `fastest-pitstop-since-2000` as
select
    min(`fl`.`time`) as `time`,
    `c`.`id` as `circuit_id`,
    `fl`.`driver_id` as `driver_ID`,
    `d`.`full_name` as `full_name`,
    `r`.`date` as `date`
from
    (((`fastest_lap` `fl`
join `race` `r` on
    (((`fl`.`race_id` = `r`.`id`) and (`r`.`date` > '2000-01-01'))))
join `driver` `d` on
    ((`fl`.`driver_id` = `d`.`id`)))
join `circuit` `c` on
    ((`r`.`circuit_id` = `c`.`id`)))
group by
    `r`.`circuit_id`,
    `d`.`id`,
    `r`.`date`;