<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require dirname(__DIR__).'/phpmailer/src/Exception.php';
require dirname(__DIR__).'/phpmailer/src/PHPMailer.php';
require dirname(__DIR__).'/phpmailer/src/SMTP.php';

if(isset($_POST['recoveryPassword']))
{
	$mail = new PHPMailer(true);

	$mail->isSMTP();
	$mail->Host = 'smtp.gmail.com';
	$mail->SMTPAuth = true;
	$mail->Username = $_POST['email']; //email
	$mail->Password = 'ksenjvapmowyrrql';
	$mail->SMTPSecure = 'ssl';
	$mail->Port = 465;

	$mail->setFrom($_POST['email']); //email

	$mail->addAddress($_POST['email']); //email

	$mail->isHTML(true);

	$mail->Subject = 'Contrasenia';
	$mail->Body = 'Tu contraseña es: AAHH MIS FURROS!!!';

	$mail->send();

	echo 'sent';
}
?>