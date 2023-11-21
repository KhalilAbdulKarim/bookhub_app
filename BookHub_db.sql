-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: 127.0.0.1    Database: bookhub_db
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `AUTHORS`
--

DROP TABLE IF EXISTS `AUTHORS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AUTHORS` (
  `authorID` int NOT NULL AUTO_INCREMENT,
  `authorName` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `authorEmail` varchar(100) NOT NULL,
  `bio` varchar(500) DEFAULT NULL,
  `authorPassword` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`authorID`),
  UNIQUE KEY `authorEmail_UNIQUE` (`authorEmail`),
  UNIQUE KEY `authorID_UNIQUE` (`authorID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AUTHORS`
--

LOCK TABLES `AUTHORS` WRITE;
/*!40000 ALTER TABLE `AUTHORS` DISABLE KEYS */;
INSERT INTO `AUTHORS` VALUES (1,'Adonis','1930-01-01','adonis@hotmail.com','Born to a modest Alawite farming family[6] in January 1930, Adonis hails from the village of al-Qassabin near the city of Latakia in western Syria. He was unable to afford formal schooling for most of his childhood, and his early education consisted of learning the Quran in the local kuttab (mosque-affiliated school) and memorizing classical Arabic poetry, to which his father had introduced him.','12345'),(2,'Leila Fuad Aboulela','1964-05-12','leilafuad@hotmail.com','Leila Fuad Aboulela s a fiction writer, essayist, and playwright of Sudanese origin based in Aberdeen, Scotland.[1] She grew up in Khartoum, Sudan, and moved to Scotland in 1990 where she began her literary career. Until 2023, Aboulela has published six novels and several short stories, which have been translated into fifteen languages','auth2'),(7,'khalil','2022-12-31','khalil4@hotmail.com','Born in lebanon.','Kh@$1243554345');
/*!40000 ALTER TABLE `AUTHORS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BOOKS`
--

DROP TABLE IF EXISTS `BOOKS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BOOKS` (
  `bookID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(155) NOT NULL,
  `publishedDate` date DEFAULT NULL,
  `ISBN` varchar(13) NOT NULL,
  `authorID` int NOT NULL,
  `genreID` int NOT NULL,
  `synopsis` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`bookID`),
  UNIQUE KEY `bookID_UNIQUE` (`bookID`),
  UNIQUE KEY `ISBN_UNIQUE` (`ISBN`),
  KEY `fk_authorID` (`authorID`),
  KEY `fk_genreID` (`genreID`),
  CONSTRAINT `fk_authorID` FOREIGN KEY (`authorID`) REFERENCES `AUTHORS` (`authorID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_genreID` FOREIGN KEY (`genreID`) REFERENCES `GENRE` (`genreID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BOOKS`
--

LOCK TABLES `BOOKS` WRITE;
/*!40000 ALTER TABLE `BOOKS` DISABLE KEYS */;
INSERT INTO `BOOKS` VALUES (1,'In the City of the Partisans','1961-01-01','9781846970802',1,10,'NONE.'),(5,'example','2023-01-01','1234567899999',1,1,NULL),(6,'sports','2021-12-01','1234567899989',2,5,'NONE.');
/*!40000 ALTER TABLE `BOOKS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GENRE`
--

DROP TABLE IF EXISTS `GENRE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GENRE` (
  `genreID` int NOT NULL AUTO_INCREMENT,
  `genreName` varchar(100) NOT NULL,
  PRIMARY KEY (`genreID`),
  UNIQUE KEY `genreName_UNIQUE` (`genreName`),
  KEY `genreName_idx` (`genreName`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GENRE`
--

LOCK TABLES `GENRE` WRITE;
/*!40000 ALTER TABLE `GENRE` DISABLE KEYS */;
INSERT INTO `GENRE` VALUES (6,'Autobiography'),(7,'Comics'),(12,'Educational'),(1,'Fiction'),(13,'Historical Fiction'),(8,'Horror'),(2,'Mystery'),(9,'Non-Fiction'),(11,'Philosophy'),(10,'Poetry'),(4,'Romance'),(3,'Science Fiction'),(14,'undefined'),(5,'Young Adult');
/*!40000 ALTER TABLE `GENRE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RECOMMENDATIONS`
--

DROP TABLE IF EXISTS `RECOMMENDATIONS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RECOMMENDATIONS` (
  `recommendationID` int NOT NULL AUTO_INCREMENT,
  `bookID` int NOT NULL,
  `recommenderUserID` int NOT NULL,
  `recipientUserID` int NOT NULL,
  PRIMARY KEY (`recommendationID`),
  KEY `fk_recommenderUserID` (`recommenderUserID`),
  KEY `fk_recipientUserID` (`recipientUserID`),
  KEY `fk_bookID` (`bookID`),
  CONSTRAINT `fk_bookID` FOREIGN KEY (`bookID`) REFERENCES `BOOKS` (`bookID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_recipientUserID` FOREIGN KEY (`recipientUserID`) REFERENCES `USERS` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_recommenderUserID` FOREIGN KEY (`recommenderUserID`) REFERENCES `USERS` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RECOMMENDATIONS`
--

LOCK TABLES `RECOMMENDATIONS` WRITE;
/*!40000 ALTER TABLE `RECOMMENDATIONS` DISABLE KEYS */;
INSERT INTO `RECOMMENDATIONS` VALUES (1,1,1,2);
/*!40000 ALTER TABLE `RECOMMENDATIONS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `REVIEWS`
--

DROP TABLE IF EXISTS `REVIEWS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `REVIEWS` (
  `reviewID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `bookID` int NOT NULL,
  `rating` int DEFAULT '0',
  `datePosted` date NOT NULL,
  `reviewText` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`reviewID`),
  UNIQUE KEY `reviewID_UNIQUE` (`reviewID`),
  KEY `userID_idx` (`userID`),
  KEY `bookID_idx` (`bookID`),
  CONSTRAINT `fk_bookID_reviews` FOREIGN KEY (`bookID`) REFERENCES `BOOKS` (`bookID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_userID` FOREIGN KEY (`userID`) REFERENCES `USERS` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REVIEWS`
--

LOCK TABLES `REVIEWS` WRITE;
/*!40000 ALTER TABLE `REVIEWS` DISABLE KEYS */;
INSERT INTO `REVIEWS` VALUES (2,2,1,5,'2023-10-27','RECOMMENDED!');
/*!40000 ALTER TABLE `REVIEWS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERS`
--

DROP TABLE IF EXISTS `USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USERS` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `userPassword` varchar(50) NOT NULL,
  `userEmail` varchar(100) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID_UNIQUE` (`userID`),
  UNIQUE KEY `userEmail_UNIQUE` (`userEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS`
--

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;
INSERT INTO `USERS` VALUES (1,'KHALIL','2023-10-27','12345','KHALIL@OUTLOOK.COM'),(2,'KHALILAKARIM','2023-10-27','12345','KHALILAKARIM@OUTLOOK.COM'),(3,'John Doe','1990-01-01','password123','johndoe@example.com'),(5,'John Doe','1990-01-01','password123','johndoe1@example.com'),(6,'John Doe12','1990-01-01','password123','johndoe145@example.com'),(7,'Johfdsfsfdn Doe12','1990-01-01','password123','johndofgfdgdfge145@example.com'),(8,'Johfdsfsgfhfhghfdn Doe12','1990-01-01','password123','johndofgfdgdfgjlkjle145@example.com'),(9,'Keyadi','1990-01-01','password123','Keyadi@example.com'),(10,'ziad','1990-01-01','Ppassword@$%%$$%$%123','ziad@example.com'),(12,'ziad1','1990-01-01','Pq@$12345','ziadwqqw@example.com');
/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-21  2:04:56
