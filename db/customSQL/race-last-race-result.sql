-- f1sp.`race-last-race-result` source

create or replace
algorithm = UNDEFINED view `race-last-race-result` as
select
    ifnull(`rr`.`position_number`, '-') as `position_number`,
    `d`.`full_name` as `full_name`,
    `d`.`permanent_number` as `permanent_number`,
    `rr`.`points` as `points`,
    `rr`.`time` as `time`,
    `gp`.`short_name` as `short_name`
from
    (((`race_result` `rr`
join `driver` `d` on
    ((`rr`.`driver_id` = `d`.`id`)))
join `race` `r` on
    ((`rr`.`race_id` = `r`.`id`)))
join `grand_prix` `gp` on
    ((`r`.`grand_prix_id` = `gp`.`id`)))
where
    (`rr`.`race_id` = (
    select
        max(`rr2`.`race_id`)
    from
        `race_result` `rr2`))
order by
    `rr`.`race_id` desc,
    (case
        when regexp_like(`rr`.`position_number`, '^[0-9]+$') then cast(`rr`.`position_number` as unsigned)
        else 999999999
    end);