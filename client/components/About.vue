<template>
	<div id="section">
		<div id="text" class="hidden">
			<p>О Нас</p>
			<div>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Id cumque fugiat cupiditate ipsum adipisci doloremque a delectus tempore eveniet? Voluptas, excepturi laborum! Sed voluptates porro ratione debitis quod quis labore?
				Iusto eligendi animi labore quos dolores harum totam facere, incidunt accusamus itaque modi provident nulla quasi perferendis, pariatur ipsa. Magnam possimus quas nulla laboriosam tempore itaque unde quod fuga magni?
				Quas aut alias, asperiores, eum, ipsa illo quae officia vel repellat dolorem ipsum provident? In, aut. Quas officia libero accusantium fugiat autem sequi reprehenderit suscipit quisquam nihil debitis, ipsam at.
				Sit, commodi? Tempora dolor velit autem rem mollitia, harum voluptatem ullam cumque illum porro nesciunt eius nemo fugit dolorum officia, repudiandae repellat eveniet cum vero saepe, doloremque id repellendus. Vel.
				Mollitia quam nobis eos vitae nihil! Quo eius repudiandae consectetur, unde molestiae ipsa voluptates nihil libero pariatur eaque officiis autem delectus fuga asperiores aliquam voluptatem quod, ipsum excepturi velit voluptatum.
			</div>
		</div>
		<div id="imgScroll" class="hidden">
			<div>
				<img src="../assets/26226693_1636913043069975_633053603627532288_n.jpg" alt="inst">
				<img src="../assets/26227135_2007525659519845_4865175087021555712_n.jpg" alt="inst">
				<img src="../assets/26868038_150547232406291_6949458085102485504_n.jpg" alt="inst">
				<img src="../assets/26868613_1213876835382585_2038183121228136448_n.jpg" alt="inst">
				<img src="../assets/26869378_541915046168086_5992819180083085312_n.jpg" alt="inst">
				<img src="../assets/31038521_235669733652666_3784034851141713920_n.jpg" alt="inst">
				<img src="../assets/30605248_209713529627313_1427163953959534592_n.jpg" alt="inst">
				<img src="../assets/30077871_237072940173207_8293714507230871552_n.jpg" alt="inst">
				<img src="../assets/31439595_363563877472141_7863566828092522496_n.jpg" alt="inst">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	mounted() {
		let imgDiv,
			img=[],
			imgSize,
			direction
		imgDiv=document.querySelector('#imgScroll').children[0]
		img[0]=this.getFirstElem(imgDiv)
		img[0].onload=() => {
			imgSize=img[0].clientHeight
			if (getComputedStyle(imgDiv).flexDirection==='column') direction='translateY'
			else direction='translateX'
			setInterval(() => {//img div slider--------------
				imgDiv.style.transition='2s ease-in-out'
				imgDiv.style.transform=direction+`(${-imgSize-8}px)`
				setTimeout(() => {	
					imgDiv.style.transition='0s'
					imgDiv.style.transform=direction+'(0px)'
					imgDiv.appendChild(img[0])
					img[0]=this.getFirstElem(imgDiv)
				}, 2000)
			},2500)
		}
	},
	methods: {
		getFirstElem(parent) {
			return parent.children[0]
		}
	}
}
</script>

<style scoped>
	#section {
		position: relative;
		z-index: 6;
		width:100vw; height:100vh;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
	}
	#text {
		-webkit-box-flex:0.55;
		    -ms-flex:0.55;
		        flex:0.55;
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
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
	}
	#text p {
		text-align: center;
		color: #3b3b3b;
		font-size: 40px;
	}
	#text div {
		display: block;
		padding: 20px;
		color:#3b3b3b;
		font-size: 20px;
	}
	#imgScroll {
		-webkit-box-flex:0.45;
		    -ms-flex:0.45;
		        flex:0.45;
	}
	#imgScroll div {
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
	#imgScroll div img {
		width: 75%;
		margin:4px;
	}
	@media screen and (min-width: 100px) and (max-width: 410px) {
		#section {
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			    -ms-flex-direction: column;
			        flex-direction: column;
		}
		#text {
			-webkit-box-flex:0.60;
			    -ms-flex:0.60;
			        flex:0.60;
		}
		#text p {
			margin-top: 20px;
			font-size: 20px;
		}
		#text div {
			overflow-y: scroll;
			font-size: 14px;
			margin-top:10px;
			margin-bottom: 10px;
		}
		#imgScroll {
			-webkit-box-flex:0.40;
			    -ms-flex:0.40;
			        flex:0.40;
		}
		#imgScroll div {
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			    -ms-flex-direction: row;
			        flex-direction: row;
		}
		#imgScroll div img {
			width: 55%;
		}	
	}
	@media screen and (min-width: 411px) and (max-width: 767px) {
		#section {
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			    -ms-flex-direction: column;
			        flex-direction: column;
		}
		#text {
			-webkit-box-flex:0.65;
			    -ms-flex:0.65;
			        flex:0.65;
		}
		#text p {
			margin-top: 20px;
			font-size: 20px;
		}
		#text div {
			overflow-y: scroll;
			font-size: 15px;
			margin-top:10px;
			margin-bottom: 10px;
		}
		#imgScroll {
			-webkit-box-flex:0.35;
			    -ms-flex:0.35;
			        flex:0.35;
		}
		#imgScroll div {
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			    -ms-flex-direction: row;
			        flex-direction: row;
		}
		#imgScroll div img {
			width: 50%;
		}	
	}
	@media screen and (min-width: 768px) and (max-width: 991px) {
		#section {
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			    -ms-flex-direction: column;
			        flex-direction: column;
		}
		#text {
			-webkit-box-flex:0.65;
			    -ms-flex:0.65;
			        flex:0.65;
		}
		#text p {
			margin-top: 30px;
			font-size: 30px;
		}
		#text div {
			overflow-y: scroll;
			font-size: 18px;
			margin-top:10px;
			margin-bottom: 10px;
		}
		#imgScroll {
			-webkit-box-flex:0.35;
			    -ms-flex:0.35;
			        flex:0.35;
		}
		#imgScroll div {
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			    -ms-flex-direction: row;
			        flex-direction: row;
		}
		#imgScroll div img {
			width: 36%;
		}	
	}
	@media screen and (min-width: 768px) and (max-width: 991px) {
		#section {
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			    -ms-flex-direction: column;
			        flex-direction: column;
		}
		#text {
			-webkit-box-flex:0.65;
			    -ms-flex:0.65;
			        flex:0.65;
		}
		#text p {
			margin-top: 30px;
			font-size: 30px;
		}
		#text div {
			overflow-y: scroll;
			font-size: 18px;
			margin-top:10px;
			margin-bottom: 10px;
		}
		#imgScroll {
			-webkit-box-flex:0.35;
			    -ms-flex:0.35;
			        flex:0.35;
		}
		#imgScroll div {
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			    -ms-flex-direction: row;
			        flex-direction: row;
		}
		#imgScroll div img {
			width: 36%;
		}	
	}
	@media screen and (min-width: 992px) and (max-width: 1199px) {
		#text p {
			margin-top: 30px;
			font-size: 34px;
		}
		#text div {
			font-size: 18px;
		}	
	}
	@media screen and (min-width: 1200px) and (max-width: 1599px) {
		#text p {
			margin-top: 30px;
			font-size: 36px;
		}
		#text div {
			font-size: 19px;
		}	
	}
</style>