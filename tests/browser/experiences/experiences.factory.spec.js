var experiencesFactory , $httpBackend
describe('experiencesFactory',function(){
	beforeEach(module('FullstackGeneratedApp'));
	beforeEach(inject(function(_experiencesFactory_,_$httpBackend_){
		experiencesFactory=_experiencesFactory_
		$httpBackend = _$httpBackend_;
	}));
	it('checks that the factory exists',function(){
		expect(experiencesFactory).to.be.ok;
	});
	it('calls fetchAll',function(){
		var experiences;
		$httpBackend.expectGET('/api/experiences/')
		.respond(alldata);
		experiencesFactory.fetchAll()
		.then(function(_experiences){
			experiences = _experiences;
		});
		$httpBackend.flush();
		expect(experiences.length).to.equal(5);
	});
	it('calls fetch',function(){
		var experience;
		$httpBackend.expectGET('/api/experiences/1')
		.respond([alldata[0]]);
		experiencesFactory.fetch(1)
		.then(function(_experience){
			experience = _experience;
		});
		$httpBackend.flush();
		expect(experience.length).to.equal(1);
	});
	it('calls add',function(){
		var experience;
		alldata.push({
  "name": "added item",
  "shortDescription": "Aliquam eos doloremque praesentium. Ut quasi facere odit aut eaque rerum facere excepturi. Commodi in expedita ad at. Dicta velit vel aperiam dolores.",
  "description": "Beatae ut distinctio vel sit quis nam natus. Est vel quis fugit voluptate reprehenderit ut est ut et. Fugiat dolor et ut in facere earum quis consequatur dolorem. Cupiditate repellendus deleniti sit sunt iure animi. Totam quis commodi ut quod blanditiis exercitationem fugit ex corrupti. Voluptate molestias sint et suscipit et veritatis quis.\n \rMaxime cupiditate ea nulla expedita dolore odit ea possimus perferendis. Quod dolores necessitatibus deleniti ipsa blanditiis odio velit natus. Et et autem nisi voluptatem modi nostrum reprehenderit. Doloremque consequatur dolore error iste.\n \rMagnam minus numquam cum aut. Et similique quos non ipsam. Harum optio non. Expedita nam fuga qui voluptates nam rerum occaecati eligendi.",
  "quantity": "8",
  "price": 941,
  "address": "0741 Cordia Roads",
  "city": "North Myra",
  "state": "West Virginia",
  "postalCode": "19820",
  "country": "Vietnam",
  "photoUrl": "http://lorempixel.com/640/480/nightlife",
  "__v": 0
});
		$httpBackend.expectPOST('/api/experiences/')
		.respond(alldata[5]);
		experiencesFactory.add()
		.then(function(_experience){
			experience = _experience;
		});
		$httpBackend.flush();
		expect(experience.name).to.equal('added item');
	});

	it('calls update',function(){
		var experience;
		alldata[4].name = 'updated item';
		$httpBackend.expectPUT('/api/experiences/2')
		.respond(alldata[4]);
		experiencesFactory.update(2)
		.then(function(_experience){
			experience = _experience;
		});
		$httpBackend.flush();
		expect(experience.name).to.equal('updated item');
	});
	it('calls remove',function(){
		var experience;
		alldata.splice(0,1);
		$httpBackend.expectDELETE('/api/experiences/2')
		.respond(alldata[4]);
		experiencesFactory.remove(2)
		.then(function(_experiences){
			experiences = _experiences;
		});
		$httpBackend.flush();
		expect(experiences).to.equal('experience added item deleted');
	});
});


var alldata=[{
  "name": "non quidem unde",
  "shortDescription": "Aliquam eos doloremque praesentium. Ut quasi facere odit aut eaque rerum facere excepturi. Commodi in expedita ad at. Dicta velit vel aperiam dolores.",
  "description": "Beatae ut distinctio vel sit quis nam natus. Est vel quis fugit voluptate reprehenderit ut est ut et. Fugiat dolor et ut in facere earum quis consequatur dolorem. Cupiditate repellendus deleniti sit sunt iure animi. Totam quis commodi ut quod blanditiis exercitationem fugit ex corrupti. Voluptate molestias sint et suscipit et veritatis quis.\n \rMaxime cupiditate ea nulla expedita dolore odit ea possimus perferendis. Quod dolores necessitatibus deleniti ipsa blanditiis odio velit natus. Et et autem nisi voluptatem modi nostrum reprehenderit. Doloremque consequatur dolore error iste.\n \rMagnam minus numquam cum aut. Et similique quos non ipsam. Harum optio non. Expedita nam fuga qui voluptates nam rerum occaecati eligendi.",
  "quantity": "8",
  "price": 941,
  "address": "0741 Cordia Roads",
  "city": "North Myra",
  "state": "West Virginia",
  "postalCode": "19820",
  "country": "Vietnam",
  "photoUrl": "http://lorempixel.com/640/480/nightlife",
  "__v": 0
},
{
  "name": "voluptas labore iure",
  "shortDescription": "Omnis necessitatibus eos eaque reiciendis id nostrum. Voluptatem aut incidunt voluptatem vel. Est modi necessitatibus reprehenderit. Temporibus quam illo quibusdam neque et ut. Quam et non modi sint velit. Voluptas aut aliquam saepe et maiores vel.",
  "description": "Laboriosam ipsum fugit quo atque ut fugiat amet. Ratione et nobis praesentium similique error est et sunt nisi. In dolor quo. Nulla temporibus doloremque maxime tempore ea hic facere. Illo corrupti perspiciatis atque in consequatur ipsam optio est. Quia sapiente perspiciatis nostrum recusandae.\n \rDoloribus est quia nesciunt. Dolores rerum quae alias et at voluptatibus. Quam vel et dignissimos consequatur libero exercitationem fugit. Enim aut nam nemo est sapiente ut qui et unde. Reprehenderit aperiam ea dicta enim in eaque earum.\n \rAutem ut est vitae a vero voluptate alias. Cumque quam ut voluptatem atque. Blanditiis sint possimus eum nesciunt consequuntur laudantium.",
  "quantity": "7",
  "price": 289,
  "address": "9796 Kelley Squares",
  "city": "New Ralphview",
  "state": "New York",
  "postalCode": "76875",
  "country": "Cyprus",
  "photoUrl": "http://lorempixel.com/640/480/nightlife",
  "__v": 0
},
{
  "name": "dolorem nihil molestias",
  "shortDescription": "Voluptatibus aut omnis nisi quos natus culpa qui officiis. Consequatur beatae libero voluptas.",
  "description": "Ipsam in dolore accusantium ex. Sed dignissimos corporis. Sit magni et est aliquid. At omnis quisquam nihil eius ducimus. Et quia quia suscipit cum nobis quis.\n \rSed neque culpa. Blanditiis distinctio iusto dicta ut nesciunt. Consequatur sunt et. Suscipit ratione sed nihil perferendis.\n \rTempora necessitatibus distinctio eum qui consequatur expedita. Neque nobis nihil et et. Nemo quo quisquam vero non quis. Eius ut itaque vitae eos odio harum impedit. Cupiditate tempora illum omnis nisi libero exercitationem.",
  "quantity": "6",
  "price": 602,
  "address": "744 Leopold Prairie",
  "city": "New Baileyborough",
  "state": "Texas",
  "postalCode": "89098",
  "country": "Croatia",
  "photoUrl": "http://lorempixel.com/640/480/nightlife",
  "__v": 0
},
{
  "name": "et vel quaerat",
  "shortDescription": "Omnis et soluta sit sapiente repudiandae est. Est ut nulla dolorem. Sit ullam repudiandae voluptates a sed accusamus sed aliquid quia. Vel velit sunt animi. Voluptas et minus. Incidunt laudantium sint fuga placeat quidem porro quo nobis atque.",
  "description": "Voluptas laudantium nihil magnam fugit possimus et earum. Est sint asperiores nihil illum magni iste. Accusamus aut assumenda. Adipisci facilis rerum ducimus suscipit distinctio harum rerum.\n \rSed ut et velit voluptas dolores accusamus. Quia possimus quidem ut facere. A inventore qui dolore qui qui sunt id. Ipsum reiciendis dignissimos quia dolorem. Deleniti voluptas assumenda ut assumenda aliquam qui.\n \rAlias totam odio inventore dolorem voluptatem nesciunt. Aut et fugiat dolorem veniam eos voluptas. Non nostrum delectus reprehenderit repudiandae occaecati deserunt at mollitia excepturi. Nesciunt velit maxime quis voluptas et repudiandae et quis. Error est soluta dolor quod dolores fugit impedit porro veniam.",
  "quantity": "6",
  "price": 435,
  "address": "2476 Tillman Pike",
  "city": "North Gussieburgh",
  "state": "Kentucky",
  "postalCode": "21530",
  "country": "Malawi",
  "photoUrl": "http://lorempixel.com/640/480/nightlife",
  "__v": 0
},
{
  "name": "est tempore omnis",
  "shortDescription": "Laudantium similique esse aperiam laboriosam qui. Repellat sed delectus laudantium delectus atque doloribus sit. Ipsam consequatur est laudantium rerum et. Sunt corrupti placeat. Perspiciatis atque fugiat similique eaque necessitatibus voluptas.",
  "description": "Quia nemo rerum sunt. Veritatis repellendus adipisci quia ut. Harum aut porro explicabo ullam ea aut.\n \rEt non ipsum ipsam quibusdam dolores placeat. Sequi assumenda velit voluptates excepturi ut provident. Ut voluptatem sequi.\n \rAccusamus dolore quasi consequatur fugiat. In minima laboriosam. Aut dolorem nam laudantium et deleniti quisquam vitae tenetur quo. Quas aut quisquam quaerat explicabo. Ducimus accusamus iure quia et aut eveniet rem est. Autem id eum dolorem distinctio consectetur et impedit.",
  "quantity": "4",
  "price": 558,
  "address": "27668 Beryl Pike",
  "city": "Patriciamouth",
  "state": "Nebraska",
  "postalCode": "09452",
  "country": "Venezuela",
  "photoUrl": "http://lorempixel.com/640/480/nightlife",
  "__v": 0
}]