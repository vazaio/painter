<template>
	<div id="section">
		<div id="name">СОЗДАЕМ НАБРОСОК</div>
		<div id="order">
			<div id="change">
				<div id="portSize"> 
   					<span>Выберите формат портрета:</span>
					<div>
						<p><input name="portSize" v-model="portFormat" type="radio" value="A4" checked><span>A4</span></p>
						<p><input name="portSize" v-model="portFormat" type="radio" value="A3"><span>A3</span></p>
						<p><input name="portSize" v-model="portFormat" type="radio" value="A2"><span>A2</span></p>
						<p><input name="portSize" v-model="portFormat" type="radio" value="A1"><span>A1</span></p>
					</div>
				</div>
				<div id="bw">
					<span>Сделать чернобелым</span>
					<input type="checkbox" v-model="portOptions.bw">
				</div>
				<label class="button">
					<input type="file" id="photo">
					<span>Выбрать фото</span>
				</label>
				<label class="button">
					<input type="file" id="background">
					<span>Выбрать фон</span>
				</label>
				<label id="background" class="button delete" @click="portOptions.bg=false">
					<span>Удалить фон</span>
				</label>
			</div>
			<div id="imgBox">
				<div id="port" v-show="!sync.loading">
					<div :style="{width: `${sizePort.w+12}px`, height: `${sizePort.h+12}px`}">
						<img :style="{
							width:`${sizeImg.w}px`, 
							height: `${sizeImg.h}px`, 
							filter:`${portOptions.bw ? 'grayscale(100%)' : 'grayscale(0%)'}`
						}" 
						src="../assets/port.png" alt="preview">
					</div>
				</div>	
				<div id="skeleton" v-show="!sync.loading">
					<img src="../assets/skeleton2.png" alt="man">
				</div>
				<div id="loader" v-show="sync.loading">
					<div v-if="sync.send" id="contact">
						<span>Как с вами связаться?</span>
						<input v-model="contact" type="text" placeholder="любые контакты">
						<button @click="syncHandler" 
							:disabled="!isSendButtonActive"
							:class="{
								buttonSuccess: isSendButtonActive,
								buttonErr: !isSendButtonActive,
								go: true
								}">
							<span>Готово</span>
						</button>
					</div>
					<img v-if="sync.preloader" id="loadingSvg" src="../assets/loading.svg" alt="loading">
					<img v-if="sync.success" src="../assets/success.svg" alt="success">
					<img v-if="sync.error" src="../assets/error.svg" alt="error" style="transform:rotate(45deg)">
				</div>
			</div>
		</div>
		<div id="price">
			<span>{{price+' руб'}}</span>
			<label @click="formSwitcher" class="button">
				<span>{{sync.loading ? 'Редактировать' : 'Контакт'}}</span>
			</label>
		</div>	
	</div>
</template>

<script>
export default {
	data() {
		return {
			portFormat:'A4',
			scale:1,
			formatSizes:[
				{h:841, w:594, price:35},
				{h:594, w:420, price:30},
				{h:420, w:297, price:25},
				{h:297, w:210, price:20}
			],
			imgSrc:'',
			img:{},
			sizeImg:1,
			portOptions:{
				img:false,
				bg:false,//background
				bw:false//blacandwhite
			},
			sync:{
				loading:false,
				preloader:false,
				success:false,
				error:false,
				send:false
			},
			contact:'',
			isSendButtonActive:false
		}
	},
	computed: {
		sizePort() {
			switch(this.portFormat) {
				case 'A4':
					return {
						h: this.scale*this.formatSizes[3].h,
						w: this.scale*this.formatSizes[3].w,
					}
					break
				case 'A3':

					return {
						h: this.scale*this.formatSizes[2].h,
						w: this.scale*this.formatSizes[2].w
					}
					break
				case 'A2':
					return {
						h: this.scale*this.formatSizes[1].h,
						w: this.scale*this.formatSizes[1].w
					}
					break
				case 'A1':
					return {
						h: this.scale*this.formatSizes[0].h,
						w: this.scale*this.formatSizes[0].w
					}
					break
				default:
					return {
						h: this.scale*this.formatSizes[0].h,
						w: this.scale*this.formatSizes[0].w
					}
			}
		},
		price() {//calculate final price
			let price=0,
				bg=0,
				bw=0
			switch(this.portFormat) {
				case 'A4': price=20 
				break
				case 'A3': price=25
				break
				case 'A2': price=30 
				break
				case 'A1': price=35 
				break
			}
			if(this.portOptions.bg) bg=2
			if(this.portOptions.bw) bw=-2
			return price+bg+bw
		}
	},
	watch: {
		imgSrc() {
			this.img.onload=() => {
				this.sizeImg=this.calcImgSize()
			}
		},
		sizePort() {
			this.sizeImg=this.calcImgSize()
		},
		contact() {
			if (this.contact.length>=10) this.isSendButtonActive=true
			else this.isSendButtonActive=false
		}
	},
	methods: {
		calcImgSize() {//calculating img sizes
			let h=this.img.naturalHeight,
				w=this.img.naturalWidth,
				scale=1
			
			if(h>w) {
				scale=this.sizePort.h/h
				h=this.sizePort.h
				w=w*scale
			}
			else {
				scale=this.sizePort.w/w
				w=this.sizePort.w
				h=h*scale
			}
			return {h,w}
		},
		changeHandler(e) {//img preview
			let file=e.target.files[0]
			let img=document.querySelector('#port').children[0].children[0]
			if(file && file.size<=2097152) {
				let fileReader = new FileReader();
				fileReader.readAsDataURL(file)
				fileReader.onload = function(e) {
					img.src=e.target.result				
				}
			}
			else img.src='../dist/port.png'			
			this.imgSrc=img.getAttribute('src')
			this.img=img
			this.portOptions.img=true
		},
		bgHandler(e) {
			this.portOptions.bg=true
		},
		syncHandler() {
			this.sync.send=false
			this.sync.success=false
			this.sync.error=false
			this.sync.preloader=true
			let randomSuccess
			randomSuccess=Math.round(Math.random())
			if (this.sync.loading) {
				setTimeout(()=>{
					this.sync.preloader=false
					let randomSuccess
					randomSuccess=Math.round(Math.random())
					if (randomSuccess===1) this.sync.success=true
					else this.sync.error=true
				},2056)
			}
		},
		formSwitcher() {
			this.sync.loading=!this.sync.loading
			this.sync.send=this.sync.loading
			this.sync.success=false
			this.sync.error=false
		}
	},
	mounted() {
		//file preview render photo-------------------------------------
		let photoInput=document.querySelector('#photo')
		photoInput.addEventListener('change', this.changeHandler)
		//file preview render photo end---------------------------------
		let bgInput=document.querySelector('#background')
		bgInput.addEventListener('change', this.bgHandler)
		//computing frame scale value -----------------------------
		let imgSkeleton=document.querySelector('#skeleton')
		this.scale=imgSkeleton.clientHeight/1850
		//computing frame scale value end----------------------------
		document.querySelector('#order').style.opacity='1'//smooze showup
	}	
}
</script>

<style scoped>
	#section {
		width: 100vw;
		height: 100vh;
		position: relative;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		overflow:hidden;
	}
	#name {
		display: block;
		position: absolute;
		top:12vh;
		left: 1vw;
		color:#3b3b3b;
		font-size: 42px;
	}
	#order {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: wrap;
		    flex-wrap: wrap;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		position: absolute; 
		width: 100vw;
		opacity:0;
		-webkit-transition: 2s;
		-o-transition: 2s;
		transition: 2s;
		-webkit-transition-delay: .8s;
		     -o-transition-delay: .8s;
		        transition-delay: .8s;
	}
	#change {
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
		width: 49%;
		border:1px solid #3b3b3b;
	}
	#portSize {
		color:#3b3b3b;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		    -ms-flex-direction: row;
		        flex-direction: row;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		margin:10px;
	}
	#portSize div {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	#portSize span {
		font-size:38px;
	}
	#portSize p {
		font-size: 38px;
		width:70px;
		margin:0 15px 0 15px;
	}
	#portSize p input {
		-webkit-transform: scale(1.8);
		    -ms-transform: scale(1.8);
		        transform: scale(1.8);	
	}
	#portSize p span {
		margin-left: 8px;
	}
	#bw span {
		font-size: 38px;
		color:#3b3b3b;
	}
	#bw input[type=checkbox] {
		-webkit-transform: scale(1.5) translateY(-1px) translateX(5px);
		    -ms-transform: scale(1.5) translateY(-1px) translateX(5px);
		        transform: scale(1.5) translateY(-1px) translateX(5px);
	}
	.button, .buttonErr, .buttonSuccess {
		position: relative;
		overflow: hidden;
		width:400px;
		height:52px;
		margin: 10px;
		background: none;
		border:1px solid #3b3b3b;
		color: #3b3b3b;
		font-size: 36px;
		text-align: center;
		-webkit-transition: .3s;
		-o-transition: .3s;
		transition: .3s;
	}
	.delete {
		width: 200px;
		height: 30px;
		font-size: 20px;
		top:-14px;
	}
	.go {
		width: 200px;
		height: 40px;
		font-size: 20px;
	}
	.button:hover {
		background: #3b3b3b;
		color:#fafafa;
		cursor: pointer;
	}
	.buttonErr:hover {
		background: #D75A4A;
		color:#fafafa;
		cursor: pointer;
	}
	.buttonSuccess:hover {
		background: #25AE88;
		color:#fafafa;
		cursor: pointer;
	}
	.button input[type="file"] {
		display: none;
	}
	.button label {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	#imgBox {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		    -ms-flex-direction: row;
		        flex-direction: row;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		-webkit-box-pack: justify;
		    -ms-flex-pack: justify;
		        justify-content: space-between;
		width: 49%;
	}
	#port {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: end;
		    -ms-flex-pack: end;
		        justify-content: flex-end;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		width: 50%;
		height: 100%;
		margin-right: 20px;
	}
	#port div {
		background-image: url("../assets/wood-pattern.png");
		background-repeat: repeat;
		-webkit-transition: .4s ease-out;
		-o-transition: .4s ease-out;
		transition: .4s ease-out;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		border: 1px solid #D1D1D1;
	}
	#port div img {
		display: block;
		-webkit-transition: .4s ease-out;
		-o-transition: .4s ease-out;
		transition: .4s ease-out;	
	}
	#skeleton {
		width:50%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
	}
	#skeleton img {
		height: 70vh;
		right: 0;
	}
	#price {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		color:#3b3b3b;
		font-size: 40px;
		position: absolute;
		bottom:7vh;
		left: 1vw;
	}
	#price label {
		margin-left:60px;
	}
	#loader  {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		width:100vw;
		height: 49vh;
	}
	#loader img {
		width:60px;
		height: 60px;
		
	}
	#loadingSvg {
		-webkit-animation: spin 1s linear infinite;
		        animation: spin 1s linear infinite;
	}
	#contact {
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
	}
	#contact span {
		font-size: 26px;
	}
	#contact input {
		font-size: 24px;
		color:#3b3b3b;
		text-align: center;
	}
	@-webkit-keyframes spin {
		from {
			-webkit-transform: rotate(0deg);
			        transform: rotate(0deg)
		}
		to {
			-webkit-transform: rotate(359deg);
			        transform: rotate(359deg)
		}
	}
	@keyframes spin {
		from {
			-webkit-transform: rotate(0deg);
			        transform: rotate(0deg)
		}
		to {
			-webkit-transform: rotate(359deg);
			        transform: rotate(359deg)
		}
	}
	@media screen and (min-width: 100px) and (max-width: 410px) {
		#name {
			font-size: 26px;
			top:1vh;
		}
		#order {
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			    -ms-flex-direction: column;
			        flex-direction: column;
			top:8vh;
		}	
		#change {
			width: 100%;
		}
		#imgBox {
			width: 100%;
		}
		#portSize {
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			    -ms-flex-direction: column;
			        flex-direction: column;
			width:90%;
		}
		#portSize span {
			font-size:16px;
		}
		#portSize p {
			font-size: 14px;
		}
		#portSize p input {
			-webkit-transform: scale(1);
			    -ms-transform: scale(1);
			        transform: scale(1);	
		}
		#bw {
			margin-bottom: 7px;
		}
		#bw span {
			font-size: 16px;
			color:#3b3b3b;
		}
		#bw input[type=checkbox] {
			-webkit-transform: scale(1.2) translateX(2px);
			    -ms-transform: scale(1.2) translateX(2px);
			        transform: scale(1.2) translateX(2px);
		}
		.button {
			width:80%;
			height:22px;
			font-size: 16px;
			margin-top:2px;
		}
		.delete {
			font-size: 14px;
			top:-8px;
			width:50%;
		}
		#skeleton img {
			height: 49vh;
			right: 0;
			margin-top: 2px;
		}
		#price {
			font-size: 24px;
			bottom: 0;
			width: 50vw;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			    -ms-flex-direction: column;
			        flex-direction: column;
			height: 80px;
			-webkit-box-pack: justify;
			    -ms-flex-pack: justify;
			        justify-content: space-between;
		}
		#price label {
			margin-left:0;
		}
		#contact span {
			font-size: 16px;
		}
		#contact input {
			font-size: 14px;
		}
		.go {
			margin-top:20px;
		}
	}
	@media screen and (min-width: 411px) and (max-width: 767px) {
		#name {
			font-size: 26px;
			top:1vh;
		}
		#order {
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			    -ms-flex-direction: column;
			        flex-direction: column;
			top:6vh;
		}	
		#change {
			width: 100%;
		}
		#imgBox {
			width: 100%;
		}
		#portSize {
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			    -ms-flex-direction: column;
			        flex-direction: column;
			width:90%;
		}
		#portSize span {
			font-size:18px;
		}
		#portSize p {
			font-size: 18px;
		}
		#portSize p input {
			-webkit-transform: scale(1.5);
			    -ms-transform: scale(1.5);
			        transform: scale(1.5);	
		}
		#bw {
			margin-bottom: 7px;
		}
		#bw span {
			font-size: 17px;
			color:#3b3b3b;
		}
		#bw input[type=checkbox] {
			-webkit-transform: scale(1.2) translateX(2px);
			    -ms-transform: scale(1.2) translateX(2px);
			        transform: scale(1.2) translateX(2px);
		}
		.button {
			width:70%;
			height:22px;
			font-size: 17px;
			margin-top:2px;
		}
		.delete {
			font-size: 14px;
			top:-8px;
			width:45%;
		}
		#skeleton img {
			height: 58vh;
			right: 0;
			margin-top: 4px;
		}
		#price {
			font-size: 24px;
			bottom: 0;
			width: 50vw;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			    -ms-flex-direction: column;
			        flex-direction: column;
			height: 80px;
			-webkit-box-pack: justify;
			    -ms-flex-pack: justify;
			        justify-content: space-between;
		}
		#price label {
			margin-left:0;
		}
		#contact span {
			font-size: 20px;
		}
		#contact input {
			font-size: 18px;
		}
		.go {
			font-size: 18px;
			height: 30px;
			margin-top:20px;
		}
	}
	@media screen and (min-width: 768px) and (max-width: 991px) {
		#name {
			font-size: 26px;
			top:1vh;
		}
		#order {
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			    -ms-flex-direction: column;
			        flex-direction: column;
			top:6vh;
		}	
		#change {
			width: 100%;
		}
		#imgBox {
			width: 100%;
		}
		#portSize {
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			    -ms-flex-direction: column;
			        flex-direction: column;
			width:90%;
		}
		#portSize span {
			font-size:22px;
		}
		#portSize p {
			font-size: 22px;
		}
		#portSize p input {
			-webkit-transform: scale(1.7);
			    -ms-transform: scale(1.7);
			        transform: scale(1.7);	
		}
		#bw {
			margin-bottom: 7px;
		}
		#bw span {
			font-size: 22px;
			color:#3b3b3b;
		}
		#bw input[type=checkbox] {
			-webkit-transform: scale(1.4) translateX(2px);
			    -ms-transform: scale(1.4) translateX(2px);
			        transform: scale(1.4) translateX(2px);
		}
		.button {
			width:50%;
			height:30px;
			font-size: 20px;
			margin-top:2px;
		}
		.delete {
			font-size: 16px;
			top:-6px;
			width:35%;
		}
		#skeleton img {
			height: 62vh;
			right: 0;
			margin-top: 4px;
		}
		#price {
			font-size: 32px;
			bottom: 0;
			width: 50vw;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			    -ms-flex-direction: column;
			        flex-direction: column;
			height: 140px;
			-webkit-box-pack: justify;
			    -ms-flex-pack: justify;
			        justify-content: space-between;
		}
		#price label {
			margin-left:0;
		}
		#contact span {
			font-size: 28px;
		}
		#contact input {
			font-size: 26px;
			margin-top: 12px;
		}
		.go {
			font-size: 20x;
			height: 40px;
			margin-top:20px;
		}
	}
	@media screen and (min-width: 992px) and (max-width: 1199px) {
		#name {
			font-size: 30px;
			top:8vh;
		}
		#portSize {
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			    -ms-flex-direction: column;
			        flex-direction: column;
		}
		#portSize span {
			font-size: 26px;
		}
		#portSize p input {
			-webkit-transform: scale(1.4);
			    -ms-transform: scale(1.4);
			        transform: scale(1.4);	
		}
		#bw span {
			font-size: 26px;
		}
		#bw input[type=checkbox] {
			-webkit-transform: scale(1.2);
			    -ms-transform: scale(1.2);
			        transform: scale(1.2);
		}
		.button {
			font-size: 26px;
			width:320px;
			height: 40px;
		}
		.delete {
			font-size: 20px;
			width:200px;
			height: 30px;
		}
		#price {
			font-size: 34px;
		}
		#contact span {
			font-size: 28px;
		}
		#contact input {
			font-size: 26px;
			margin-top: 12px;
		}
		.go {
			font-size: 20x;
			height: 40px;
			margin-top:20px;
			width: 160px;
		}
	}
	@media screen and (min-width: 1200px) and (max-width: 1599px) {
		#name {
			font-size: 36px;
		}
		#portSize {
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			    -ms-flex-direction: column;
			        flex-direction: column;
		}
		#portSize span {
			font-size: 32px;
		}
		#portSize p input {
			-webkit-transform: scale(1.4);
			    -ms-transform: scale(1.4);
			        transform: scale(1.4);	
		}
		#bw span {
			font-size: 32px;
		}
		#bw input[type=checkbox] {
			-webkit-transform: scale(1.2);
			    -ms-transform: scale(1.2);
			        transform: scale(1.2);
		}
		.button {
			font-size: 30px;
			height: 44px;
		}
		.delete {
			font-size: 22px;
			height: 38px;
		}
		#price {
			font-size: 38px;
		}
		#contact span {
			font-size: 28px;
		}
		#contact input {
			font-size: 26px;
			margin-top: 12px;
		}
		.go {
			font-size: 20x;
			height: 40px;
			margin-top:20px;
		}
	}
</style>
