<?php

require "vendor/autoload.php";

use Abraham\TwitterOAuth\TwitterOAuth;

include('keys.inc.php');
$key = KEY;
$secret = SECRET;
$access_token = ACCESS_TOKEN;
$access_token_secret = ACCESS_TOKEN_SECRET;

$connection = new TwitterOAuth($key, $secret, $access_token, $access_token_secret);
$content = $connection->get("account/verify_credentials");

$result = $connection->get("search/tweets", array("q" => $_REQUEST['symbol']));

var_dump($result);
?>