<template>
	<div id="section">
		<p>Как с нами связаться</p>
		<div id="linkBio">
			<a href="#"><img src="../assets/facebook.svg" alt="facebook"></a>
			<a href="#"><img src="../assets/pinterest.svg" alt="pinterest"></a>
			<a href="#"><img src="../assets/tumblr.svg" alt="tumblr"></a>
			<a href="#"><img src="../assets/twitter.svg" alt="twitter"></a>
			<a href="#"><img src="../assets/whatsapp.svg" alt="whatsapp"></a>
			<a href="#"><img src="../assets/instagrams.svg" alt="instagram"></a>
		</div>
		<div id="phone">
			<div class="phoneBox">
				Телефон: +375299262924
			</div>
			<div class="phoneBox right">
				<span>Адрес:</span>
				<span>Lorem ipsum</span>
				<span>dolor sit amet consectetur</span>
				<span>adipisicing elit</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	
}
</script>

<style scoped>
	#section {
		overflow: hidden;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		    -ms-flex-direction: column;
		        flex-direction: column;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		width:100vw; height:100vh;
		position: relative;
		z-index: 6;
	}
	#section p {
		color: #3b3b3b;
		font-size: 50px;
	}
	#linkBio {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-pack: distribute;
		    justify-content: space-around;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		width:80vw;
		height: 300px;
	}
	#linkBio img {
		width: 140px;
	}
	#linkBio a:hover {
		cursor: pointer;
	}
	#phone {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		width:98%;
		position: absolute;
		bottom:3vh;
	}
	.phoneBox {
		width:50%;
		text-align: left;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		    -ms-flex-direction: column;
		        flex-direction: column;
		-webkit-box-pack: end;
		    -ms-flex-pack: end;
		        justify-content: flex-end;
		color: #3b3b3b;
		font-size: 24px;
	}
	.right {
		text-align: right;
	}
	@media screen and (min-width: 100px) and (max-width: 410px) {
		#section p {
			font-size: 36px;
		}
		#linkBio {
			width:100vw;
		}
		#linkBio img {
			width: 30px;
		}
		#phone {
			bottom:6vh;
		}
		.phoneBox {
			font-size: 18px;
		}
	}
	@media screen and (min-width: 411px) and (max-width: 767px) {
		#section p {
			font-size: 40px;
		}
		#linkBio {
			width:100vw;
		}
		#linkBio img {
			width: 40px;
		}
		#phone {
			bottom:6vh;
		}
		.phoneBox {
			font-size: 18px;
		}
	}
	@media screen and (min-width: 768px) and (max-width: 991px) {
		#section p {
			font-size: 40px;
		}
		#linkBio img {
			width: 50px;
		}
		.phoneBox {
			font-size: 20px;
		}
	}
	@media screen and (min-width: 992px) and (max-width: 1199px) {
		#section p {
			font-size: 42px;
		}
		#linkBio img {
			width: 80px;
		}
		.phoneBox {
			font-size: 22px;
		}
	}
	@media screen and (min-width: 1200px) and (max-width: 1599px) {
		#section p {
			font-size: 46px;
		}
		#linkBio img {
			width: 110px;
		}
		.phoneBox {
			font-size: 24px;
		}
	}
</style>