<?php

require '../vendor/PHP-Mailer/src/PHPMailer.php';
require '../vendor/PHP-Mailer/src/SMTP.php';
require '../vendor/PHP-Mailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name     = $_POST['name'] ?? '';
    $address  = $_POST['address'] ?? '';
    $email    = $_POST['email'] ?? '';
    $phone    = $_POST['phone'] ?? '';
    $services = $_POST['services'] ?? [];
    $message  = $_POST['message'] ?? '';
    $pageUrl  = $_SERVER['HTTP_REFERER'] ?? ($_POST['page_url'] ?? 'Not provided');

    if (empty($name) || empty($address) || empty($email) || empty($phone) || empty($message)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Please fill in all required fields.']);
        exit;
    }

    $serviceList = !empty($services) ? implode(', ', (array)$services) : 'None selected';

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'nicksautodetailingwebsiteform@gmail.com';
        $mail->Password   = 'fxjl tfrt ocqg yjfv';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom('nicksautodetailingwebsiteform@gmail.com', 'Nicks Car Detailing');
        $mail->addAddress('access@sustain-media.com');

        $mail->isHTML(true);
        $mail->Subject = 'NEW Quote Request from Car Detailing Website';
        $mail->Body    = "
            <h2>Car Detailing Quote Request : Contact Form Submission</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Address:</strong> {$address}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Phone:</strong> {$phone}</p>
            <p><strong>Selected Services:</strong> {$serviceList}</p>
            <p><strong>Message:</strong> {$message}</p>
            <p><strong>Submitted From:</strong> <a href='{$pageUrl}' target='_blank'>{$pageUrl}</a></p>
        ";

        $mail->send();

        echo json_encode(['status' => 'success', 'message' => 'Form submitted successfully.']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
