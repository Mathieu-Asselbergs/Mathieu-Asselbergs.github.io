<?php

$servername = "localhost:3306";
$username = "h_00001fd3_mat";
$password = "_Gladiator023";
$dbname = "h_00001fd3_hi";

try {
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$quote = str_replace("'", "''", $_POST['quote']);
	
	$sql = "INSERT INTO HiQuotes (quote, author, visibility, ttl) VALUES ('$quote', '$_POST[author]', $_POST[visibility], $_POST[ttl])";

	$conn->exec($sql);
	$conn = null;
	
	echo "Thank you so much for your submission! I received it in good order. You can now leave this page.";
} catch(PDOException $e) {
	echo "Connection failed: " . $e->getMessage();
}

?>