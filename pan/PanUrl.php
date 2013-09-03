<?php
/*  	
 * 百度盘取真实链接API   Ver 1.2 
 *  作者 1023580617
 *
 *		  更新(13/3/19)：
 *				增加了文件的存在判断
 * 				可以查看文件名
 *				
 */
 class BDPurl {
	public  $BDPName;
	
	public function _GetUrl($shareid, $uk) {
	if($shareid==''||$uk==''){
	$this->BDPName ='';
	return 'False! Code:1';
	}
	$par='shareid=' . $shareid . '&uk=' . $uk;
	$DownloadPage="http://pan.baidu.com/share/link?".$par;	
	$Pagefile=file_get_contents($DownloadPage);
	
	$title = '/<title>(.*?)<\/title>/';
	preg_match_all($title,$Pagefile,$resultTi);
	$title_ = implode("",$resultTi[1]);
	if($title_ =='百度云 网盘-链接不存在'){
	$this->BDPName ='';
	return 'False! Code:2';
	}
	else{
	$title = '/(.*?)_免费高速下载|百度云 网盘-分享无限制/';
	preg_match_all($title,$title_,$resultTi);
	$this->BDPName = implode("",$resultTi[1]);
	}
	
	$First='/href="http:\/\/www.baidupcs.com\/(.*?)" id="downFileButtom"/';
	preg_match_all($First,$Pagefile,$resultLB);
	$Second = implode("",$resultLB[1]);
	$tempurl="http://www.baidupcs.com/".$Second;
	$fileurlt=str_replace("\"","",$tempurl);
	$fileurlt=str_replace("&amp;","&",$fileurlt);
	return $fileurlt;
	}
	}