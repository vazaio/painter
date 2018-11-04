<template>
	<main>
		<header>
			<div id="buttonMenu" @click="menuHandler">
  				<div class="button">
    				<span></span>
					<div></div>
					<div></div>
  				</div>
			</div>
			<div id="menuBox" class="menuBoxHide">
				<ul id="menuList">
					<li class="menuListClass">
						<router-link :to="{name:'home'}">
							ДОМАШНЯЯ
						</router-link>
					</li>
					<li class="menuListClass">
						<router-link :to="{name:'order'}">
							СОЗДАТЬ НАБРОСОК
						</router-link>
					</li>
					<li class="menuListClass">
						<router-link :to="{name:'contacts'}">
							КОНТАКТЫ
						</router-link>
					</li>
					<li class="menuListClass">
						<router-link :to="{name:'about'}">
							О НАС
						</router-link>
					</li>
				</ul>
			</div>
		</header>
		<section>
			<router-view></router-view>
		</section>
	</main>
</template>

<script>
export default {
	data() {
		return {
			showMenuBox:false,
			menuBox: {},
			menuList: {},
			buttonMenu: {}
		}
	},
	methods: {
		menuHandler() {//switch menu classes, change css styles TO SHOW/HIDE menu
			this.showMenuBox=!this.showMenuBox
			this.buttonMenu.classList.toggle('buttonActive')
			if(this.showMenuBox) {
				this.menuBox.classList.remove('menuBoxHide')
				this.menuBox.classList.add('menuBoxShow')
				this.menuBox.style.transitionDelay="0s"
				for(let i=0; i < 4; i++) {
					this.menuList.children[i].style.transitionDelay=`${(i+1)*0.2}s`
					this.menuList.children[i].style.opacity="1"
					this.menuList.children[i].style.transform="scale(1)"
				}
			}
			else {
				this.menuBox.classList.remove('menuBoxShow')
				this.menuBox.classList.add('menuBoxHide')
				this.menuBox.style.transitionDelay=".8s"
				for(let i=0; i < 4; i++) {
					this.menuList.children[i].style.transitionDelay=`${(4-(i+1))*0.2}s`
					this.menuList.children[i].style.opacity="0"
					this.menuList.children[i].style.transform="scale(0.85)"
				}
			}
		} 
	},
	mounted() {
		this.menuBox=document.querySelector('#menuBox')
		this.menuList=document.querySelector('#menuList')
		this.buttonMenu=document.querySelector('#buttonMenu').children[0]
		for(let i=0; i<4; i++) {
			this.menuList.children[i].addEventListener('click', this.menuHandler)
		}
	}	
}
</script>

<style scoped>
	#buttonMenu {
		position:fixed;
		z-index:11;
		width:60px;
		height: 60px;
		right:0;
		color:#3B3B3B; /*PRIMARY COLOR*/
		cursor: pointer;
		right:10px;
	}
	.button, .buttonActive {
  		display: -webkit-box;
  		display: -ms-flexbox;
  		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		    -ms-flex-direction: column;
		        flex-direction: column;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		-webkit-box-align: start;
		    -ms-flex-align: start;
		        align-items: flex-start;
  		width: 60px;
		height: 60px;
		position: relative;
	}
	.button span, .button div,
	.button span::before,
	.button span::after {
		position: absolute;
		width: 46px;
		height: 2px;
		background-color: #3B3B3B;
		-webkit-box-sizing: border-box;
		        box-sizing: border-box;
	}
	.button span::before,
	.button span::after {
		content: '';
		display: block;
		-webkit-transition: 0.6s;
		-o-transition: 0.6s;
		transition: 0.6s;
	}
	.button span::before {
		width: 56px;
		-webkit-transform: translateY(-10px);
		    -ms-transform: translateY(-10px);
		        transform: translateY(-10px);
	}
	.button span::after {
		width: 42px;
		-webkit-transform: translateY(10px);
		    -ms-transform: translateY(10px);
		        transform: translateY(10px);
	}
	.buttonActive {
		width: 42px;
		height: 42px;
		top: 10px;
	}
	.buttonActive span {
		width: 0px;
	}
	.button div {
		width: 0;
		height: 2px;
	}
	.buttonActive div {
		opacity: 1;
		width: 30px;
		height: 2px;
		-webkit-transform-origin: center;
		    -ms-transform-origin: center;
		        transform-origin: center;
		-webkit-transition: .2s;
		-o-transition: .2s;
		transition: .2s;
		left:6px;
	}
	.buttonActive div:nth-child(2) {
		-webkit-transform: rotate(45deg);
		    -ms-transform: rotate(45deg);
		        transform: rotate(45deg);
	}
	.buttonActive div:nth-child(3) {
		-webkit-transform: rotate(-45deg);
		    -ms-transform: rotate(-45deg);
		        transform: rotate(-45deg);
	}
	.buttonActive span::before {
		border-top:2px solid #3B3B3B;
		border-left:2px solid #3B3B3B;
		border-right:2px solid transparent;
		border-radius:21px 21px 0 0;
		-webkit-transform: translateY(-20px);
		    -ms-transform: translateY(-20px);
		        transform: translateY(-20px);
	}
	.buttonActive span::after {
		border-bottom:2px solid #3B3B3B;
		border-left:2px solid transparent;
		border-right:2px solid #3B3B3B;
		border-radius:0 0 21px 21px;
		-webkit-transform: translateY(0px);
		    -ms-transform: translateY(0px);
		        transform: translateY(0px);
	}
	.buttonActive span::after,.buttonActive span::before {
		-webkit-transform-origin: top left;
		    -ms-transform-origin: top left;
		        transform-origin: top left;
		background-color: transparent;
		width: 42px;
		height: 21px;
	}
	#menuBox {
		position:fixed;
		width: 100vw;
		height: 100vh;
		background-color: #fafafa;
		display:-webkit-box;
		display:-ms-flexbox;
		display:flex;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center; 
		overflow: hidden;
		-webkit-transition: .8s;
		-o-transition: .8s;
		transition: .8s;
	}
	.menuBoxShow {
		opacity: 1;
		z-index: 10;
	}
	.menuBoxHide {
		opacity: 0;
		z-index: 0;
	}
	#menuList li {
		-webkit-box-sizing: border-box;
		        box-sizing: border-box;
		text-align: center;
		list-style-type: none;
		border-bottom:1px solid #3B3B3B;
		padding:12px 0 12px 0;
		font-size: 40px;
		color: #3B3B3B;
		cursor: pointer;
		-webkit-transition: .7s;
		-o-transition: .7s;
		transition: .7s;
		opacity: 0;
		-webkit-transform: scale(0.85);
		    -ms-transform: scale(0.85);
		        transform: scale(0.85);
	}
	#menuList li a:hover {
		color: #808080;
	}
	#menuList li a {
		display: block;
		text-decoration: none;
		color:#3B3B3B;
	}
	section {
		overflow: hidden;
		width: 100vw;
		height: 100vh;
	}
	main {
		background-color: #fafafa;
	}
	@media screen and (min-width: 100px) and (max-width: 767px) {
		#buttonMenu {
			bottom: -6px;
			-webkit-transform: scale(0.75);
			    -ms-transform: scale(0.75);
			        transform: scale(0.75);
			right:-4px;
		}
	}
	@media screen and (min-width: 100px) and (max-width: 321px) {
		#menuList li {
			font-size: 20px;
			padding:8px 0 8px 0;
		}
	}
	@media screen and (min-width: 321px) and (max-width: 420px) {
		#menuList li {
			font-size: 24px;
			padding:9px 0 9px 0;
		}
	}
	@media screen and (min-width: 420px) and (max-width: 767px) {
		#menuList li {
			font-size: 28px;
			padding:10px 0 10px 0;
		}
	}
	@media screen and (min-width: 767px) and (max-width: 1199px) {
		#menuList li {
			font-size: 32px;
			padding:11px 0 11px 0;
		}
	}
	@media screen and (min-width: 1199px) and (max-width: 1599px) {
		#menuList li {
			font-size: 36px;
			padding:12px 0 12px 0;
		}
	}
</style>
