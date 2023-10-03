<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//delcarations.
/*
$type = $_POST["type"];
$avatar = $_POST["avatar"];
$addons = $_POST["add-ons"];
$reffiles = $_POST["ref-files"];
$refurls = $_POST["ref-urls"];
$info = $_POST["addtl-info"];
$email = $_POST["email"];
$tos = $_POST["tos"];
*/

require "../assets/phpmailer/src/Exception.php";
require "../assets/phpmailer/src/PHPMailer.php";
require "../assets/phpmailer/src/SMTP.php";

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->Host       = 'smtp.gmail.com';
  $mail->SMTPAuth   = true;
  $mail->Username   = 'evulbad@gmail.com'; 
  $mail->Password   = 'hole tnae qdku crxa';
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  $mail->Port       = 465;

  //Recipients
  $mail->setFrom('orders@evulbad.com', 'orders');
  $mail->addAddress('evulbad@gmail.com');
  $mail->addReplyTo('info@example.com');

  //Attachments
  /*
  $mail->addAttachment('/tmp/image.jpg', 'new.jpg');
  */

  /*
  $message = "CLIENT: ".$email."/n TYPE: ".$type."/n AVATAR: ".$avatar."/n ADD-ONS: ".$addons."/n REFS: ".$refurls."/n INFO: ".$info."/n TOS: ".$tos;
  */

  //Content
  $mail->isHTML(true);
  $mail->Subject = '3D COMMISSION ORDER';
  $mail->Body    = '$message';

  $mail->send();
  echo 'Message has been sent';
} catch (Exception $e) {
  echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>