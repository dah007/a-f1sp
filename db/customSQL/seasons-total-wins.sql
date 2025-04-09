-- f1sp.`seasons-total-wins` source

create or replace
algorithm = UNDEFINED view `seasons-total-wins` as
select
    count(`d`.`id`) as `total`,
    `d`.`full_name` as `name`,
    `d`.`id` as `id`,
    `r`.`year` as `year`
from
    (((`race_result` `rr`
join `constructor` `c` on
    ((`rr`.`constructor_id` = `c`.`id`)))
join `driver` `d` on
    ((`rr`.`driver_id` = `d`.`id`)))
join `race` `r` on
    ((`rr`.`race_id` = `r`.`id`)))
where
    (`rr`.`position_number` = 1)
group by
    `d`.`id`, `r`.`year` 
order by
    `r`.`year` desc, `total` desc;