CREATE TABLE `images` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `lookup` varchar(255) NOT NULL,
    `filename` varchar(1000) NOT NULL,
    `contentType` varchar(255) NOT NULL,
    `hits` int(11) NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`),
    KEY `idx_lookup` (`lookup`)
);
