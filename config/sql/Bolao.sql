CREATE TABLE `tournament` (
  `id` int PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `tournament_edition` (
  `id` int PRIMARY KEY,
  `name` varchar(255),
  `tournament_id` int,
  `openDate` datetime,
  `closeDate` datetime
);

CREATE TABLE `team` (
  `id` int PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `team_names` (
  `id` uniqueidentifier PRIMARY KEY,
  `team_id` int,
  `name` varchar(255),
  `name_short` varchar(255),
  `language` varchar(255)
);

CREATE TABLE `group` (
  `id` int PRIMARY KEY,
  `tournament_id` int,
  `name` varchar(255)
);

CREATE TABLE `match` (
  `id` int PRIMARY KEY,
  `tournament_id` int,
  `group_id` int,
  `kick_off` datetime,
  `team_a` int,
  `team_b` int,
  `score_a` int,
  `score_b` int
);

CREATE TABLE `match_event` (
  `id` uniqueidentifier PRIMARY KEY,
  `match_id` int,
  `event_type_id` int,
  `minute` int,
  `team_id` int,
  `player_id` int
);

CREATE TABLE `event_type` (
  `id` int PRIMARY KEY,
  `name` varchar(255),
  `emoji` char,
  `color` varchar(255)
);

CREATE TABLE `player` (
  `id` int PRIMARY KEY,
  `name` varchar(255),
  `short_name` varchar(255),
  `shirt_number` int
);

CREATE TABLE `user` (
  `id` int PRIMARY KEY,
  `name` varchar(255),
  `mail` varchar(255),
  `google_id` varchar(255),
  `facebook_id` varchar(255),
  `microsoft_id` varchar(255),
  `photo_url` varchar(255),
  `password` varchar(255),
  `created_at` timestamp
);

CREATE TABLE `game` (
  `id` int PRIMARY KEY,
  `tournament_edition_id` int,
  `rule_id` int
);

CREATE TABLE `user_in_game` (
  `id` int PRIMARY KEY,
  `user_id` int,
  `game_id` int,
  `created_at` timestamp,
  `payment` money,
  `payed_at` datetime
);

CREATE TABLE `point` (
  `id` uniqueidentifier PRIMARY KEY,
  `match_id` int,
  `user_id` int,
  `points` int,
  `score_a` int,
  `score_b` int,
  `bet_made_at` timestamp
);

CREATE TABLE `rule` (
  `id` int PRIMARY KEY
);

CREATE TABLE `admin` (
  `id` uniqueidentifier PRIMARY KEY,
  `user_id` int,
  `game_id` int
);

CREATE TABLE `team_mapping` (
  `id` uniqueidentifier PRIMARY KEY,
  `tournament_id` int,
  `generic_id` varchar(255),
  `team_id` int
);

ALTER TABLE `tournament_edition` ADD FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`id`);

ALTER TABLE `team_names` ADD FOREIGN KEY (`team_id`) REFERENCES `team` (`id`);

ALTER TABLE `group` ADD FOREIGN KEY (`tournament_id`) REFERENCES `tournament_edition` (`id`);

ALTER TABLE `match` ADD FOREIGN KEY (`group_id`) REFERENCES `group` (`id`);

ALTER TABLE `match` ADD FOREIGN KEY (`team_a`) REFERENCES `team` (`id`);

ALTER TABLE `match` ADD FOREIGN KEY (`team_b`) REFERENCES `team` (`id`);

ALTER TABLE `match_event` ADD FOREIGN KEY (`match_id`) REFERENCES `match` (`id`);

ALTER TABLE `match_event` ADD FOREIGN KEY (`team_id`) REFERENCES `team` (`id`);

ALTER TABLE `match_event` ADD FOREIGN KEY (`event_type_id`) REFERENCES `event_type` (`id`);

ALTER TABLE `match_event` ADD FOREIGN KEY (`player_id`) REFERENCES `player` (`id`);

ALTER TABLE `game` ADD FOREIGN KEY (`tournament_edition_id`) REFERENCES `tournament_edition` (`id`);

ALTER TABLE `user_in_game` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `user_in_game` ADD FOREIGN KEY (`game_id`) REFERENCES `game` (`id`);

ALTER TABLE `point` ADD FOREIGN KEY (`user_id`) REFERENCES `user_in_game` (`id`);

ALTER TABLE `point` ADD FOREIGN KEY (`match_id`) REFERENCES `match` (`id`);

ALTER TABLE `game` ADD FOREIGN KEY (`rule_id`) REFERENCES `rule` (`id`);

ALTER TABLE `admin` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `admin` ADD FOREIGN KEY (`game_id`) REFERENCES `game` (`id`);

ALTER TABLE `team_mapping` ADD FOREIGN KEY (`id`) REFERENCES `tournament_edition` (`id`);

ALTER TABLE `team_mapping` ADD FOREIGN KEY (`team_id`) REFERENCES `team` (`id`);
