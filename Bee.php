<?php
class Bee
{
	
	public function calculate($a, $b) {
		$_SESSION['state']=true;
		switch ($a){
			case 'dark_vador':
				if(!isset($_SESSION[$a][$b])) $_SESSION[$a][$b] = 100;
				$_SESSION[$a][$b] = $_SESSION[$a][$b] - 9;
				if ($_SESSION[$a][$b] < 0) $_SESSION['state'] = false;
				break;
			case 'strom_trooper':
				if(!isset($_SESSION[$a][$b])) $_SESSION[$a][$b] = 85;
				$_SESSION[$a][$b] = $_SESSION[$a][$b] -10;				
				break;
			case 'drone_trooper':
				if(!isset($_SESSION[$a][$b])) $_SESSION[$a][$b] = 45;
				$_SESSION[$a][$b] = $_SESSION[$a][$b] - 14;
				break;
		}	
		if($_SESSION['state'] == false){
			session_unset(); 
			session_destroy(); 
		}
		
    }
}	
	