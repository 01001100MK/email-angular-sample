CREATE DATABASE  IF NOT EXISTS `EmailProject` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `EmailProject`;
-- MySQL dump 10.13  Distrib 5.7.13, for linux-glibc2.5 (x86_64)
--
-- Host: localhost    Database: EmailProject
-- ------------------------------------------------------
-- Server version	5.7.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Draft`
--

DROP TABLE IF EXISTS `Draft`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Draft` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `subject` varchar(100) DEFAULT NULL,
  `detail` varchar(1200) DEFAULT NULL,
  `sender` varchar(45) DEFAULT NULL,
  `receiver` varchar(45) DEFAULT NULL,
  `source` varchar(10) NOT NULL DEFAULT 'draft',
  `star` tinyint(4) NOT NULL DEFAULT '0',
  `isRead` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Draft`
--

LOCK TABLES `Draft` WRITE;
/*!40000 ALTER TABLE `Draft` DISABLE KEYS */;
INSERT INTO `Draft` VALUES (16,'2016-09-23 20:54:47','draft2','testing...','pwagyi','kit kit','draft',0,1),(17,'2016-09-25 20:54:56','draft1','testing...','pwagyi','lu lu','draft',1,1),(18,'2016-09-30 20:54:56','draft2','testing...fff','pwagyi','wut mon','draft',0,1);
/*!40000 ALTER TABLE `Draft` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Inbox`
--

DROP TABLE IF EXISTS `Inbox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Inbox` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datetime` datetime DEFAULT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `detail` varchar(1200) DEFAULT NULL,
  `sender` varchar(45) DEFAULT NULL,
  `receiver` varchar(45) DEFAULT NULL,
  `source` varchar(10) NOT NULL DEFAULT 'inbox',
  `star` tinyint(4) NOT NULL DEFAULT '0',
  `isRead` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Inbox`
--

LOCK TABLES `Inbox` WRITE;
/*!40000 ALTER TABLE `Inbox` DISABLE KEYS */;
INSERT INTO `Inbox` VALUES (13,'2016-09-22 00:00:00','inbox3','testing...','tester','pwagyi','inbox',0,0),(14,'2016-09-21 00:00:00','inbox2','testing...','dark','pwagyi','inbox',1,0),(15,'2016-09-20 00:00:00','inbox1','testing...','light','pwagyi','inbox',0,0);
/*!40000 ALTER TABLE `Inbox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Outbox`
--

DROP TABLE IF EXISTS `Outbox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Outbox` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `subject` varchar(100) DEFAULT NULL,
  `detail` varchar(1200) DEFAULT NULL,
  `sender` varchar(45) DEFAULT NULL,
  `receiver` varchar(45) DEFAULT NULL,
  `source` varchar(10) NOT NULL DEFAULT 'outbox',
  `star` tinyint(4) NOT NULL DEFAULT '0',
  `isRead` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Outbox`
--

LOCK TABLES `Outbox` WRITE;
/*!40000 ALTER TABLE `Outbox` DISABLE KEYS */;
INSERT INTO `Outbox` VALUES (25,'2016-09-27 21:25:35','Love You','I love you!','pwagyi','Love','outbox',1,1),(26,'2016-09-27 21:25:28','outbox1','testing...','pwagyi','hehe','outbox',0,1),(27,'2016-09-23 00:00:00','outbox3','testing...','pwagyi','lu lu','outbox',1,1),(28,'2016-09-20 00:00:00','outbox2','testing...','pwagyi','phwe phwe','outbox',0,1);
/*!40000 ALTER TABLE `Outbox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Trash`
--

DROP TABLE IF EXISTS `Trash`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Trash` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datetime` datetime DEFAULT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `detail` varchar(1200) DEFAULT NULL,
  `sender` varchar(45) DEFAULT NULL,
  `receiver` varchar(45) DEFAULT NULL,
  `source` varchar(10) DEFAULT NULL,
  `star` tinyint(4) DEFAULT NULL,
  `isRead` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Trash`
--

LOCK TABLES `Trash` WRITE;
/*!40000 ALTER TABLE `Trash` DISABLE KEYS */;
/*!40000 ALTER TABLE `Trash` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(25) DEFAULT NULL,
  `password` varchar(25) DEFAULT NULL,
  `name` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'pwagyi','pwagyi','Aung Kyaw');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-02 21:35:55
