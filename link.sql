/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50536
Source Host           : localhost:3306
Source Database       : link

Target Server Type    : MYSQL
Target Server Version : 50536
File Encoding         : 65001

Date: 2016-06-13 14:53:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for computer
-- ----------------------------
DROP TABLE IF EXISTS `computer`;
CREATE TABLE `computer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(15) DEFAULT NULL,
  `port` varchar(5) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `zone` varchar(10) DEFAULT NULL,
  `ttl` varchar(10) DEFAULT NULL,
  `lng` varchar(20) DEFAULT NULL,
  `lat` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of computer
-- ----------------------------
INSERT INTO `computer` VALUES ('18', '9.8.8.8', '10021', '0', '中国', '0', '35.994', '-78.8986');
INSERT INTO `computer` VALUES ('20', '114.114.114.114', '2', '0', '中国', '0', '32.0617', '118.7778');
INSERT INTO `computer` VALUES ('21', '8.8.8.8', '12203', '0', '美国', '0', '37.386', '-122.0838');
INSERT INTO `computer` VALUES ('22', '222.15.15.14', '100', '0', '日本', '0', '36.8', '139.9333');
INSERT INTO `computer` VALUES ('23', '110.75.137.2', '19998', '0', '中国', '0', '30.2936', '120.1614');
INSERT INTO `computer` VALUES ('24', '216.75.137.20', '19999', '0', '美国', '0', '42.3584', '-71.0598');
INSERT INTO `computer` VALUES ('25', '202.16.1.2', '12203', '0', '日本', '0', '35.69', '139.69');
INSERT INTO `computer` VALUES ('26', '212.2.15.10', '12203', '0', '英国', '0', '51.5', '-0.13');
INSERT INTO `computer` VALUES ('27', '200.200.200.200', '12203', '0', '巴西', '0', '-10', '-55');
INSERT INTO `computer` VALUES ('28', '5.5.5.5', '12203', '0', '德国', '0', '51', '9');
INSERT INTO `computer` VALUES ('29', '119.11.11.11', '12203', '0', '澳大利亚', '0', '-31.8005', '115.7575');
INSERT INTO `computer` VALUES ('30', '145.11.11.11', '12203', '0', '荷兰', '0', '51.8333', '5.8667');
INSERT INTO `computer` VALUES ('31', '146.11.11.11', '12203', '0', '澳大利亚', '0', '-27', '133');
INSERT INTO `computer` VALUES ('32', '197.0.11.11', '10025', '0', '突尼斯', '0', '34', '9');
