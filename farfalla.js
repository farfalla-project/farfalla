/*!
 * Farfalla - Accessibility in the Cloud
 * http://farfalla-project.org/
 *
 *  Copyright (C) 2010  Andrea Mangiatordi
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

if (!Array.prototype.indexOf)
{ Array.prototype.indexOf = function(elt /*, from*/) { var len = this.length >>> 0; var from = Number(arguments[1]) || 0; from = (from < 0) ? Math.ceil(from) : Math.floor(from); if (from < 0) from += len; for (; from < len; from++) { if (from in this && this[from] === elt) return from; } return -1; }; }

var retrieveURL = function(filename) {
    var scripts = document.getElementsByTagName('script');
    if (scripts && scripts.length > 0) {
        for (var i in scripts) {
            if (scripts[i].src && scripts[i].src.match(new RegExp(filename+'\\.js'))) {
                return scripts[i].src.replace(new RegExp('(.*)'+filename+'\\.js.*'), '$1');
            }
        }
    }
};

var farfalla_path = retrieveURL('farfalla');
var version = '1.0.3';

//
// Call the basically required scripts...
//

/**
    Head JS     The only script in your <HEAD>
    Copyright   Tero Piirainen (tipiirai)
    License     MIT / http://bit.ly/mit-license
    Version     1.0.2
    http://headjs.com
*//*! head.load - v1.0.3 */
(function(n,t){"use strict";function w(){}function u(n,t){if(n){typeof n=="object"&&(n=[].slice.call(n));for(var i=0,r=n.length;i<r;i++)t.call(n,n[i],i)}}function it(n,i){var r=Object.prototype.toString.call(i).slice(8,-1);return i!==t&&i!==null&&r===n}function s(n){return it("Function",n)}function a(n){return it("Array",n)}function et(n){var i=n.split("/"),t=i[i.length-1],r=t.indexOf("?");return r!==-1?t.substring(0,r):t}function f(n){(n=n||w,n._done)||(n(),n._done=1)}function ot(n,t,r,u){var f=typeof n=="object"?n:{test:n,success:!t?!1:a(t)?t:[t],failure:!r?!1:a(r)?r:[r],callback:u||w},e=!!f.test;return e&&!!f.success?(f.success.push(f.callback),i.load.apply(null,f.success)):e||!f.failure?u():(f.failure.push(f.callback),i.load.apply(null,f.failure)),i}function v(n){var t={},i,r;if(typeof n=="object")for(i in n)!n[i]||(t={name:i,url:n[i]});else t={name:et(n),url:n};return(r=c[t.name],r&&r.url===t.url)?r:(c[t.name]=t,t)}function y(n){n=n||c;for(var t in n)if(n.hasOwnProperty(t)&&n[t].state!==l)return!1;return!0}function st(n){n.state=ft;u(n.onpreload,function(n){n.call()})}function ht(n){n.state===t&&(n.state=nt,n.onpreload=[],rt({url:n.url,type:"cache"},function(){st(n)}))}function ct(){var n=arguments,t=n[n.length-1],r=[].slice.call(n,1),f=r[0];return(s(t)||(t=null),a(n[0]))?(n[0].push(t),i.load.apply(null,n[0]),i):(f?(u(r,function(n){s(n)||!n||ht(v(n))}),b(v(n[0]),s(f)?f:function(){i.load.apply(null,r)})):b(v(n[0])),i)}function lt(){var n=arguments,t=n[n.length-1],r={};return(s(t)||(t=null),a(n[0]))?(n[0].push(t),i.load.apply(null,n[0]),i):(u(n,function(n){n!==t&&(n=v(n),r[n.name]=n)}),u(n,function(n){n!==t&&(n=v(n),b(n,function(){y(r)&&f(t)}))}),i)}function b(n,t){if(t=t||w,n.state===l){t();return}if(n.state===tt){i.ready(n.name,t);return}if(n.state===nt){n.onpreload.push(function(){b(n,t)});return}n.state=tt;rt(n,function(){n.state=l;t();u(h[n.name],function(n){f(n)});o&&y()&&u(h.ALL,function(n){f(n)})})}function at(n){n=n||"";var t=n.split("?")[0].split(".");return t[t.length-1].toLowerCase()}function rt(t,i){function e(t){t=t||n.event;u.onload=u.onreadystatechange=u.onerror=null;i()}function o(f){f=f||n.event;(f.type==="load"||/loaded|complete/.test(u.readyState)&&(!r.documentMode||r.documentMode<9))&&(n.clearTimeout(t.errorTimeout),n.clearTimeout(t.cssTimeout),u.onload=u.onreadystatechange=u.onerror=null,i())}function s(){if(t.state!==l&&t.cssRetries<=20){for(var i=0,f=r.styleSheets.length;i<f;i++)if(r.styleSheets[i].href===u.href){o({type:"load"});return}t.cssRetries++;t.cssTimeout=n.setTimeout(s,250)}}var u,h,f;i=i||w;h=at(t.url);h==="css"?(u=r.createElement("link"),u.type="text/"+(t.type||"css"),u.rel="stylesheet",u.href=t.url,t.cssRetries=0,t.cssTimeout=n.setTimeout(s,500)):(u=r.createElement("script"),u.type="text/"+(t.type||"javascript"),u.src=t.url);u.onload=u.onreadystatechange=o;u.onerror=e;u.async=!1;u.defer=!1;t.errorTimeout=n.setTimeout(function(){e({type:"timeout"})},7e3);f=r.head||r.getElementsByTagName("head")[0];f.insertBefore(u,f.lastChild)}function vt(){for(var t,u=r.getElementsByTagName("script"),n=0,f=u.length;n<f;n++)if(t=u[n].getAttribute("data-headjs-load"),!!t){i.load(t);return}}function yt(n,t){var v,p,e;return n===r?(o?f(t):d.push(t),i):(s(n)&&(t=n,n="ALL"),a(n))?(v={},u(n,function(n){v[n]=c[n];i.ready(n,function(){y(v)&&f(t)})}),i):typeof n!="string"||!s(t)?i:(p=c[n],p&&p.state===l||n==="ALL"&&y()&&o)?(f(t),i):(e=h[n],e?e.push(t):e=h[n]=[t],i)}function e(){if(!r.body){n.clearTimeout(i.readyTimeout);i.readyTimeout=n.setTimeout(e,50);return}o||(o=!0,vt(),u(d,function(n){f(n)}))}function k(){r.addEventListener?(r.removeEventListener("DOMContentLoaded",k,!1),e()):r.readyState==="complete"&&(r.detachEvent("onreadystatechange",k),e())}var r=n.document,d=[],h={},c={},ut="async"in r.createElement("script")||"MozAppearance"in r.documentElement.style||n.opera,o,g=n.head_conf&&n.head_conf.head||"head",i=n[g]=n[g]||function(){i.ready.apply(null,arguments)},nt=1,ft=2,tt=3,l=4,p;if(r.readyState==="complete")e();else if(r.addEventListener)r.addEventListener("DOMContentLoaded",k,!1),n.addEventListener("load",e,!1);else{r.attachEvent("onreadystatechange",k);n.attachEvent("onload",e);p=!1;try{p=!n.frameElement&&r.documentElement}catch(wt){}p&&p.doScroll&&function pt(){if(!o){try{p.doScroll("left")}catch(t){n.clearTimeout(i.readyTimeout);i.readyTimeout=n.setTimeout(pt,50);return}e()}}()}i.load=i.js=ut?lt:ct;i.test=ot;i.ready=yt;i.ready(r,function(){y()&&u(h.ALL,function(n){f(n)});i.feature&&i.feature("domloaded",!0)})})(window);
//# sourceMappingURL=head.load.min.js.map
/*
  WebFontConfig = {
    google: { families: [ 'Exo:400,700,400italic,700italic:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
*/

// Parses the options passed along while including farfalla.js

var scriptnodes = document.getElementsByTagName('script');
var scriptnode;
var source;
var fpc_token;
var options = "";
var pocket;
/*
head.load(farfalla_path+'bower_components/requirejs/require.js', function(){
requirejs.config({
  'store':{
    exports: 'store'
  }
});
  var store = require([farfalla_path+'bower_components/store-js/src/store-engine.js'])
  store.each(function(value, key) {
	   console.log(key, '==', value)
   });
});
*/


/**
 * Pocket.js v2.2.0
 *
 * @file A blazing fast lightweight storage library
 * @author Vincent Racine vincentracine@hotmail.co.uk
 * @license MIT
 */
function Pocket(options){

	'use strict';

	var Utils = {
		/**
		 * Checks a value if of type array
		 * @param {*} arg
		 * @returns {boolean}
		 */
		isArray: function(arg){
			return Object.prototype.toString.call(arg) === '[object Array]';
		},

		/**
		 * Checks a value if of type object
		 * @param {*} arg
		 * @returns {boolean}
		 */
		isObject: function(arg){
			return Object.prototype.toString.call(arg) === '[object Object]';
		},

		/**
		 * Recursively merge two objects
		 * @param obj1
		 * @param obj2
		 * @returns {*}
		 */
		merge: function(obj1, obj2){
			for (var p in obj2) {
				try {
					if(obj2[p].constructor == Object) {
						obj1[p] = Utils.merge(obj1[p], obj2[p]);
					}else{
						obj1[p] = obj2[p];
					}
				}catch(e) {
					obj1[p] = obj2[p];
				}
			}
			return obj1;
		},

		/**
		 * Clone object
		 */
		clone: function(arg){
			return (JSON.parse(JSON.stringify(arg)));
		},

		/**
		 * Resolve object field value passed on string path.
		 * Thank you http://stackoverflow.com/a/22129960/5678694!
		 * @param path
		 * @param object
		 * @returns {*}
		 */
		resolve: function(path, object){
			return path.split('.').reduce(function(prev, curr) {
				return prev ? prev[curr] : undefined
			}, object || self)
		},

		/**
		 * Generates an id with a extremely low chance of collision
		 * @returns {string} ID
		 */
		uuid: function(){
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
		}
	};

	var Query = {
		/**
		 * Formats a DB query
		 * @param {object|string|number} [query] DB query to format
		 */
		format: function(query){
			if(!query) return {};
			if(typeof query === 'string' || typeof query === 'number') return {_id:query};
			return query;
		},

		/**
		 * Finds documents which are valid based on a query
		 *
		 * @param document
		 * @param query
		 * @returns {boolean} valid
		 */
		compare: function(document, query){
			var keys = Object.keys(query),
				condition,
				operator;

			for (var i = 0; i < keys.length; i++) {
				condition = { name: keys[i], value: query[keys[i]] };

				// Actual field value
				var value = Utils.resolve(condition.name, document);

				if(typeof value === 'undefined' && typeof Query.Operators[condition.name] !== 'function') {
					return false;
				}

				if(typeof Query.Operators[condition.name] === 'function'){
					return Query.Operators[condition.name](document, condition.value)
				}else if(typeof condition.value === 'object'){
					operator = Object.keys(condition.value)[0];
					if(typeof Query.Operators[operator] === 'function'){
						return Query.Operators[operator](value, condition.value[operator])
					}else{
						throw new Error("Unrecognised operator '" + operator + "'");
					}
				}else{
					return Query.Operators.$eq(value, condition.value);
				}
			}

			return true;
		},

		/**
		 * Comparison operators
		 * @see https://docs.mongodb.org/manual/reference/operator/query-comparison/
		 */
		Operators: {
			/**
			 * Equality test
			 *
			 * @example
			 * Examples.find({ forename: { $eq: 'Foo' } });
			 *
			 * @example
			 * Examples.find({ forename: 'Foo' }); // Shorthand
			 * Examples.find({ forename: { $eq: 'Foo' } });
			 *
			 * @param a
			 * @param b
			 * @return {boolean} result
			 */
			'$eq': function(a,b){
				return a == b;
			},

			/**
			 * Inequality test
			 *
			 * @example
			 * Examples.find({ forename: { $ne: 'Foo' } });
			 *
			 * @param a
			 * @param b
			 * @return {boolean} result
			 */
			'$ne': function(a,b){
				return a != b;
			},

			/**
			 * Or test
			 *
			 * @example
			 * Examples.find({ $or: [{ name:'Foo' },{ name:'Bar' }] });
			 *
			 * @param a
			 * @param b
			 */
			'$or': function(a,b){
				// Throw an error if not passed an array of possibilities
				if(!Utils.isArray(b)){
					throw new Error('$or Operator expects an Array')
				}

				var i;

				if(Utils.isObject(a)){
					for (i = 0; i < b.length; i++) {
						if(Query.compare(a, b[i])){
							return true;
						}
					}
				}else{
					// Test each value from array of possibilities
					for (i = b.length; i >= 0; i--) {
						if(this.$eq(a,b[i])){
							// Satisfied, return true
							return true;
						}
					}
				}

				// Failed to satisfy, return false
				return false;
			},

			/**
			 * Greater than test
			 *
			 * @example
			 * Examples.find({ age: { $gt: 17 } });
			 *
			 * @param a
			 * @param b
			 */
			'$gt': function(a,b){
				return a > b;
			},

			/**
			 * Greater than or equal test
			 *
			 * @example
			 * Examples.find({ age: { $gte: 18 } });
			 *
			 * @param a
			 * @param b
			 */
			'$gte': function(a,b){
				return a >= b;
			},

			/**
			 * Less than test
			 *
			 * @example
			 * Examples.find({ age: { $lt: 18 } });
			 *
			 * @param a
			 * @param b
			 */
			'$lt': function(a,b){
				return a < b;
			},

			/**
			 * Less than or equal test
			 *
			 * @example
			 * Examples.find({ age: { $lte: 18 } });
			 *
			 * @param a
			 * @param b
			 */
			'$lte': function(a,b){
				return a <= b;
			},

			/**
			 * Contains test for strings
			 *
			 * @example
			 * Examples.find({ name: { $contains: "foo" } });
			 *
			 * @param a
			 * @param b
			 */
			'$contains': function(a,b){
				return a.indexOf(b) > -1;
			},

			/**
			 * Check whether a key exists within an array
			 *
			 * @example
			 * Examples.find({ age:{ $in: [16,17,18] } });
			 *
			 * @param a
			 * @param b
			 * @returns {boolean}
			 */
			'$in': function(a,b){
				// Throw an error if not passed an array of possibilities
				if(!Utils.isArray(b)){
					throw new Error('$in Operator expects an Array')
				}
				return b.indexOf(a) > -1;
			},

			/**
			 * Check whether a key does not exist within an array
			 *
			 * @example
			 * Examples.find({ age:{ $nin: [16,17,18] } });
			 *
			 * @param a
			 * @param b
			 * @returns {boolean}
			 */
			'$nin': function(a,b){
				// Throw an error if not passed an array of possibilities
				if(!Utils.isArray(b)){
					throw new Error('$nin Operator expects an Array')
				}
				return b.indexOf(a) === -1;
			},

			/**
			 * Check whether key is data type. Uses standard javascript object types.
			 *
			 * @example
			 * Examples.find({ age:{ $type: "number" } });
			 *
			 * @param a
			 * @param b
			 */
			'$type': function(a,b){
				// Null
				if(b === "null"){
					return a === null;
				}

				// Arrays
				if(b === "array"){
					return Utils.isArray(a);
				}

				// All other supported types
				return typeof a === b;
			}
		}
	};

	/**
	 * Store Object
	 *
	 * @example
	 * var store = new Store();
	 *
	 * @returns {Store}
	 */
	function Store(options){
		this.version = '2.2.0';
		this.collections = {};
		this.options = Utils.merge({autoCommit: true, dbname: "pocket", driver:Pocket.Drivers.DEFAULT}, options || {});

		if(!this.options.driver)
			throw new Error('Storage driver was not found');
		if(this.options.driver === Pocket.Drivers.WEBSQL){
			if(!window.hasOwnProperty("openDatabase"))
				throw new Error('Web SQL is not supported in your browser');
			this.options.driver = openDatabase(this.options.dbname, '1.0', 'Pocket.js datastore', 10 * 1024 * 1024);
		}
	}
	/**
	 * Collection Object
	 * @param name Collection name
	 * @param options Options additional options
	 * @returns {Collection}
	 */
	function Collection(name, options){
		if(!name)
			throw new Error('Collection requires a name');
		this.name = name;
		this.documents = [];
		this.options = options || {};
		this.length = 0;
		return this;
	}
	/**
	 * Document Object
	 * @param {object} object Document data
	 * @returns {object} Document data
	 */
	function Document(object){
		if(!Utils.isObject(object))
			throw new Error('Invalid argument. Expected an Object.');
		if(object.hasOwnProperty('_id') === false)
			object._id = Utils.uuid();
		this.object = object;
		return this.object;
	}

	Store.prototype = {
		/**
		 * Retrieve a collection from the store.
		 * If the collection does not exist, one will be created
		 * using the name passed to the function
		 *
		 * @example
		 * var Examples = Store.collection('example');
		 *
		 * @param {string} name Collection name
		 * @param {object} [options] Options when creating a new collection
		 * @returns {Collection}
		 */
		collection: function(name, options){
			if(!name)
				throw new Error('Invalid argument. Expected a collection name.');
			var collection = this.collections[name];
			if(!collection){
				collection = new Collection(name, options || this.options);
				this.collections[name] = collection;
			}
			return collection;
		},

		/**
		 * Removes a collection from the store
		 *
		 * @example
		 * Store.removeCollection('example');
		 *
		 * @param {string} name Collection name
		 * @returns {Store}
		 */
		removeCollection: function(name){
			if(!name)
				return this;
			var collection = this.collections[name];
			if(collection){
				collection.destroy();
				delete this.collections[name];
			}
			return this;
		},

		/**
		 * Stores a collection into local storage
		 *
		 * @param {Collection} [name] Collection name to store into local storage
		 * @param {Function} [callback] Async callback
		 */
		commit: function(name, callback){
			if(!name)
				throw new Error('Invalid arguments. Expected collection name');
			var collection = this.collections[name];
			if(collection){
				collection.commit(callback);
			}
			return this;
		},

		/**
		 * Restore previous version of the store.
		 * @param options
		 * @param callback
		 */
		restore: function(options, callback) {
			var self = this,
				driver = this.options.driver;

			if (typeof options === 'function'){
				callback = options;
				options = {};
			}

			callback = callback || function(){};

			if(this.options.driver === Pocket.Drivers.DEFAULT ||
				this.options.driver === Pocket.Drivers.SESSION_STORAGE){
				var storage = this.options.driver;
				var len = storage.length;
				for(; len--;){
					var key = storage.key(len);
					if(key.indexOf(this.options.dbname) == 0){
						var row = storage.getItem(key);
						if(typeof row === 'string'){
							var data = JSON.parse(row),
								collection;
							collection = new Collection(data.name, data.options);
							collection.options.driver = driver;
							collection.documents = data.documents;
							collection.length = data.documents.length;
							this.collections[collection.name] = collection;
						}
					}
				}
			}

			if(this.options.driver.toString() === "[object Database]"){
				this.options.driver.transaction(function(tx) {
					tx.executeSql('SELECT tbl_name from sqlite_master WHERE type = "table" AND tbl_name != "__WebKitDatabaseInfoTable__"', [], function(tx, results){
						var rows = results.rows, count = 0, length = rows.length;

						// No tables
						if(length == 0){
							return callback(null);
						}

						// Has tables
						for (var i = 0, len = rows.length; i < len; i++) {
							tx.executeSql('SELECT json from ' + rows.item(i).tbl_name + ' LIMIT 1', [], function(tx, results){
								var rows = results.rows;

								for (var i = 0, len = rows.length; i < len; i++) {
									var json = rows.item(i).json;
									if(typeof json === 'string'){
										var data = JSON.parse(json),
											collection;
										collection = new Collection(data.name, data.options);
										collection.options.driver = driver;
										collection.documents = data.documents;
										collection.length = data.documents.length;
										self.collections[collection.name] = collection;
									}

									// Increment count or exit
									if(count == length - 1){
										callback(null);
									}else{
										count++;
									}
								}
							});
						}
					}, function(tx, error){
						callback(error);
					});
				});
			}

			return this;
		},

		/**
		 * Clean-up after ourselves
		 */
		destroy: function(){
			for (var collection in this.collections) {
				if(this.collections.hasOwnProperty(collection)){
					if(collection instanceof  Collection){
						collection.destroy();
						delete this.collections[collection];
					}
				}
			}
			this.collections = [];
		}
	};
	Collection.prototype = {
		/**
		 * Inserts data into a collection
		 *
		 * @example
		 * var Examples = Store.addCollection('example');
		 * Examples.insert({ forename: 'Foo', surname: 'Bar' });
		 * Examples.insert([{ forename: 'Pete', surname: 'Johnson' }, { forename: 'Joe', surname: 'Bloggs' }])
		 *
		 * @param {object|Array} doc Data to be inserted into the collection. Can also be array of data.
		 * @param {Function} [callback] Async callback
		 * @returns {Document|Array}
		 */
		insert: function(doc, callback){
			var document;

			if(Utils.isArray(doc)){
				document = doc.map(function(document){
					document = new Document(document);
					this.documents.push(document);
					return document;
				}, this);
			}else{
				document = new Document(doc);
				this.documents.push(document);
			}

			this.length = this.documents.length;

			if(this.options.autoCommit){
				this.commit(callback);
			}

			return document;
		},

		/**
		 * Returns an array of documents which satisfy the query given
		 *
		 * @example
		 * var Examples = Store.addCollection('example');
		 * Examples.insert({ _id: '1', forename: 'Foo', surname: 'Bar' });
		 * Examples.insert({ _id: '2', forename: 'Bar', surname: 'Foo' });
		 * Examples.insert({ _id: '3', forename: 'Foo', surname: 'Bar' });
		 * console.log(Examples.length) // 2
		 *
		 * var results = Examples.find({ forename: 'Foo' });
		 * console.log(results) // [{ _id: '1', forename: 'Foo', surname: 'Bar' }, { _id: '3', forename: 'Foo', surname: 'Bar' }]
		 *
		 * @param {object|number|string} [query] Query which tests for valid documents
		 * @return {Collection[]}
		 */
		find: function(query){
			var keys,
				results;

			// Get clone of documents in collection
			results = this.documents.slice(0);

			query = Query.format(query);

			// Get query keys
			keys = Object.keys(query);

			while(keys.length > 0){
				// Break out of loop if we have 0 documents in result
				if(results.length === 0){
					break;
				}

				results = results.filter(function(document){
					var part = {};
					part[keys[0]] = query[keys[0]];
					return Query.compare(document, part)
				});

				// Remove query key
				keys.splice(0,1);
			}

			// Return results to caller
			return results;
		},

		/**
		 * Returns the first document which satisfied the query given
		 *
		 * @example
		 * var Examples = Store.addCollection('example');
		 * Examples.insert({ _id: '1', forename: 'Foo', surname: 'Bar' });
		 * Examples.insert({ _id: '2', forename: 'Foo', surname: 'Bar' });
		 * console.log(Examples.length) // 2
		 *
		 * var result = Examples.findOne({ forename: 'Foo', surname: 'Bar' });
		 * console.log(result) // { _id: '1', forename: 'Foo', surname: 'Bar' }
		 *
		 * @param {object|number|string} [query] Query which tests for valid documents
		 * @return {Collection}
		 */
		findOne: function(query){
			return this.find(query)[0] || null;
		},

		/**
		 * Updates an existing document inside the collection
		 * Supports partial updates
		 *
		 * @example
		 * var Examples = Store.addCollection('example');
		 * Examples.insert({ _id: 0, forename: 'Foo', surname: 'Bar' });
		 * Examples.update({ _id: 0 },{ title: 'Mrs' });
		 *
		 * var result = Examples.findOne({ _id:0 });
		 * console.log(result) // { _id: '0', forename: 'Foo', surname: 'Bar', title: 'Mrs' }
		 *
		 * @param {object|number|string} [query] Query which tests for valid documents
		 * @param {object} doc Data to be inserted into the collection
		 * @param {Function} [callback] Async callback
		 * @returns {Collection}
		 */
		update: function(query, doc, callback){
			var documents = this.find(Query.format(query));

			// Iterate through query results and update
			documents.forEach(function(document){
				// Get index of document in the collection
				var index = this.documents.indexOf(document);

				// If index is not -1 (means it wasn't found in the array)
				if(index !== -1){
					//  Merge currently record with update object
					this.documents[index] = new Document(Utils.merge(this.documents[index], doc));
				}
			}, this);

			if(this.options.autoCommit){
				this.commit(callback);
			}

			// Return collection
			return this;
		},

		/**
		 * Removes documents which satisfy the query given
		 *
		 * @example
		 * var Examples = Store.addCollection('example');
		 * Examples.insert({ _id: '394', forename: 'Foo', surname: 'Bar' });
		 * console.log(Examples.length) // 1
		 * Examples.remove({ _id: '394' });
		 * console.log(Examples.length) // 0
		 *
		 * @example
		 * var Examples = Store.addCollection('example');
		 * Examples.insert({ _id: '394', forename: 'Foo', surname: 'Bar' });
		 * console.log(Examples.length) // 1
		 * Examples.remove({ forename: 'Foo' });
		 * console.log(Examples.length) // 0
		 *
		 * @param {object|number|string} [query] Query which tests for valid documents
		 * @param {Function} [callback] Async callback
		 * @return {Collection}
		 */
		remove: function(query, callback){
			var documents = this.find(Query.format(query));

			// Iterate through query results
			documents.forEach(function(document){
				// Get index of document in the collection
				var index = this.documents.indexOf(document);

				// If index is not -1 (means it wasn't found in the array)
				if(index !== -1){
					// If found in the array, remove it
					this.documents.splice(index, 1);
					// Update the length of the collection
					this.length--;
				}
			}, this);

			if(this.options.autoCommit){
				this.commit(callback);
			}

			// Return collection
			return this;
		},

		/**
		 * Stores the collection into local storage
		 *
		 * @return {Collection}
		 */
		commit: function(callback){
			var name = this.name,
				collection = JSON.parse(JSON.stringify(this));

			// Convert storage
			delete collection.options.driver;

			// Convert to JSON
			var json = JSON.stringify(collection);

			callback = callback || function(){};

			if(this.options.driver === Pocket.Drivers.DEFAULT ||
				this.options.driver === Pocket.Drivers.SESSION_STORAGE){
				this.options.driver.setItem(this.options.dbname.concat("." + this.name), json);
			}

			if(this.options.driver.toString() === "[object Database]"){
				this.options.driver.transaction(function(tx) {
					tx.executeSql('DROP TABLE IF EXISTS ' + name);
					tx.executeSql('CREATE TABLE ' + name + ' (json)');
					tx.executeSql('INSERT INTO ' + name + ' (json) VALUES (?)', [json], function(tx, result){
						callback(null, tx, result);
					}, function(tx, error){
						callback(error);
					});
				});
			}

			return this;
		},

		/**
		 * Returns the size of the collection
		 * @returns {Number} size of collection
		 */
		size: function(){
			return this.documents.length;
		},

		/**
		 * Delete collection contents
		 */
		destroy: function(){
			// Force auto commit
			if(!this.options.autoCommit)
				this.options.autoCommit = true;

			// Remove all documents in collection
			this.remove();
			this.documents = this.options = this.name = null;
		}
	};

	return new Store(options);
}
Pocket.Drivers = {
	'DEFAULT': window.localStorage,
	'LOCAL_STORAGE': window.localStorage,
	'SESSION_STORAGE': window.sessionStorage,
	'WEBSQL': 'WEBSQL'
};

if(typeof exports !== 'undefined') {
	if( typeof module !== 'undefined' && module.exports ) {
		exports = module.exports = Pocket
	}
	exports.Pocket = Pocket
}

  var pocket = new Pocket();
  var fstore = pocket.collection('fstore');


/*
if(typeof require !== 'undefined'){
  require([farfalla_path+'bower_components/store-js/src/store-engine.js',farfalla_path+'bower_components/store-js/src/util.js'], function(){
    alert(store);
})};
*/
for (var i = 0; i < scriptnodes.length; i++) {
  scriptnode = scriptnodes[i];
  if (scriptnode.src == /farfalla\.js/) break;
}

if(scriptnode){source=scriptnode.src};

farfalla_ui_options = function() {
  // if no options are passed, this is skipped (thanks to the "?" in the matching string)
  if (source){
    var optStart = source.search('\\?');
    options = source.substr(optStart+1).replace(/&/g,'","');
    options = options.replace(/=/g,'":"');
    options = '{"'+options+'"}';
  }

  if(options != "" && options.substring(0, 6) != '{"http'){
    var fp_token = JSON.parse(options).fp_token;
  }
  var url = "https://farfallaproject.herokuapp.com/profiles/status";
  var xhr = new XMLHttpRequest();
//  xhr.open("GET", url, true);
//  if(fp_token) xhr.setRequestHeader('fp_token',fp_token);
//  xhr.send();

//  xhr.onreadystatechange = function() {//Call a function when the state changes.
//      if(this.readyState == this.HEADERS_RECEIVED) {
//        var fpc_token = xhr.getResponseHeader("Fpc_token");
//        if(fpc_token){
          farfalla_activate_toolbar();
//        }
//      }
//  }

};

farfalla_activate_toolbar = function() {
          head.load(farfalla_path+'dist/farfalla.css?v='+Math.random(),
                    farfalla_path+'dist/farfalla.js?v='+Math.random());
};


farfalla_ui_options();


// Google analytics monitoring code

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','_gafarfalla');

  _gafarfalla('create', 'UA-9777827-10', {'cookieName':'_gafarfalla'});
  _gafarfalla('set', 'anonymizeIp', true);
  _gafarfalla('send', 'pageview');
