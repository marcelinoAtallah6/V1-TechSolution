CREATE DATABASE  IF NOT EXISTS `jewelry` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `jewelry`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: jewelry
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `jewelry_products`
--

DROP TABLE IF EXISTS `jewelry_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jewelry_products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_desc` varchar(250) DEFAULT NULL,
  `product_gram` int DEFAULT NULL,
  `product_stone` varchar(250) DEFAULT NULL,
  `product_stone_weight` varchar(250) DEFAULT NULL,
  `product_size` varchar(250) DEFAULT NULL,
  `product_other1` varchar(4000) DEFAULT NULL,
  `product_other2` varchar(4000) DEFAULT NULL,
  `product_price` int DEFAULT NULL,
  `product_image` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jewelry_products`
--

LOCK TABLES `jewelry_products` WRITE;
/*!40000 ALTER TABLE `jewelry_products` DISABLE KEYS */;
INSERT INTO `jewelry_products` VALUES (30,'CET6022233',2,'2','2','233666','2','2',2,'assets/img/CET6022233.jpg'),(31,'CET60',3,'3','3','33','3','3',3,'assets/img/CET60.jpg'),(32,'CET60',23,'23','2777','7','7','7',777,'assets/img/CET60.jpg'),(33,'CET60',3,'w','3','3','3','3',3,'assets/img/CET60.jpg'),(34,'CET60',3,'3','3','3','3','3',3,'assets/img/CET60.jpg'),(35,'CET60',22,'2','2','2','2','2',22,'assets/img/CET60.jpg'),(37,'CET45',34,'34','34','34','34','34',34,'assets/img/CET45.jpg'),(38,'CET60',11,'1','1','1','1','1',1,'assets/img/CET60.jpg'),(39,'CET60',9999,'99','99','99','9','9',99,'assets/img/CET60.jpg'),(40,'CET45',555,'55','555','55','5','55',5,'assets/img/CET45.jpg'),(41,'CET60',34,'34','34','34','34','34',34,'assets/img/CET60.jpg'),(42,'CET60',22,'22','2','2','2','2',2,'assets/img/CET60.jpg'),(43,'CET6034',4,'4','4','34','34','34',343,'assets/img/CET6034.jpg'),(44,'CET6033',34,'34','34','34','34','34',34,'assets/img/CET6033.jpg'),(45,'CET60',34,'34','34','3','34','3434',34,'assets/img/CET60.jpg'),(46,'CET60',2323,'23','23','23','323232','23',23,'assets/img/CET60.jpg');
/*!40000 ALTER TABLE `jewelry_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jewelry_products_images`
--

DROP TABLE IF EXISTS `jewelry_products_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jewelry_products_images` (
  `product_image_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `product_image_path` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`product_image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jewelry_products_images`
--

LOCK TABLES `jewelry_products_images` WRITE;
/*!40000 ALTER TABLE `jewelry_products_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `jewelry_products_images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-10 16:12:02
