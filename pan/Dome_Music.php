<?php
header('Content-type:text/html; charset=utf-8');

require "./PanUrl.php";
$BDP = new BDPurl();
$Url = $BDP->_GetUrl('525072','1124157138');
echo  $BDP->BDPName ."</br>";
echo '<audio src="';
echo $Url;
echo '" controls="controls" autoplay="autoplay" >
你的浏览器不支持HTML5。请使用Chrome、Firefox 或 Opera。
</audio>';
?> 