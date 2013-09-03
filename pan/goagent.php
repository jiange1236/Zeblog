<?php

require_once '../libs/BaiduPCS.class.php';
//请根据实际情况更新$access_token与$appName参数
$access_token = '3.d35e6026e16da6baf21375f202eed8a1.2592000.1372778877.2131189278-913895';
//应用目录名
$appName = 'app_1';
//应用根目录
$root_dir = '/apps' . '/' . $appName . '/';

$fileName = 'goagent.zip';

//文件路径
$path = $root_dir . $fileName;

$pcs = new BaiduPCS($access_token);

header('Content-Disposition:attachment;filename="' . $fileName . '"');
header('Content-Type:application/octet-stream');
$result = $pcs->download($path);
echo $result;
?>