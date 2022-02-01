<?php
header("Content-Type: application/json");

$data = file_get_contents('./data/data.json');

$json = json_encode($data);
if ($json === false) {
    $json = json_encode(["jsonError" => json_last_error_msg()]);
    if ($json === false) {
        $json = '{"jsonError":"unknown"}';
    }
    http_response_code(500);
}
echo $json;
?>
