-- f1sp.`season-points-by-race` source

create or replace
algorithm = UNDEFINED view `season-points-by-race` as
select
    `d`.`full_name` as `full_name`,
    `rr`.`points` as `points`,
    `rr`.`position_number` as `position_number`,
    `r`.`id` as `raceId`,
    `gp`.`short_name` as `short_name`,
    `r`.`year` as `year`
from
    (((`race_result` `rr`
join `driver` `d` on
    ((`rr`.`driver_id` = `d`.`id`)))
join `race` `r` on
    ((`rr`.`race_id` = `r`.`id`)))
join `grand_prix` `gp` on
    (((`r`.`grand_prix_id` = `gp`.`id`) and (`rr`.`points` is not null))))
order by
    `r`.`id`,
    `rr`.`position_number`,
    `d`.`full_name`;