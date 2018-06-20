/*
	This file is a part of "Papier" a paper-crafting tool
	
Copyright (C) 2018  Saint Pierre Thomas ( s1pierro@protonmail.fr )

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
function  distance (c1, c2)
{
	var d = Math.sqrt( (c2[0]-c1[0])*(c2[0]-c1[0])+
							 (c2[1]-c1[1])*(c2[1]-c1[1])+
							 (c2[2]-c1[2])*(c2[2]-c1[2]) );
	return d;
}
/** @constructor */
function Vector(a, b, c) {
    this.o = a;
    this.s = b;
    this.n = c
}
/**
	set the vector from two vertice wher a will be the origin
	@param {object} a - the first vertice to use to compute the vector object ( will be origin )
	@param {object} b - the seecond vertice to use to compute the vector object

*/
Vector.prototype.setFromVertices = function (a, b)
{
	if (a[0] == b[0] && a[1] == b[1] && a[2] == b[2])
	{
		this.o = [0.0, 0.0, 0.0];
		this.s = [0.0, 0.0, 0.0];
		this.n = 0.0;
	}
	var c = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]) + (b[2] - a[2]) * (b[2] - a[2]));
	this.o = a;
	this.s = [(b[0] - a[0]) / c, (b[1] - a[1]) / c, (b[2] - a[2]) / c];
	this.n = c;
}
function vectfromvertices(a, b) {
	if (a[0] == b[0] && a[1] == b[1] && a[2] == b[2])
		return new Vector([0.0, 0.0, 0.0], [0.0, 0.0, 0.0], 0.0);
    var c = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]) + (b[2] - a[2]) * (b[2] - a[2]));
    return new Vector(a, [(b[0] - a[0]) / c, (b[1] - a[1]) / c, (b[2] - a[2]) / c], c)
}
window.vectfromvertices = vectfromvertices;
function magnitudevertex(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2])
}
window.magnitudevertex = magnitudevertex;

function normalisevertex(a) {
    var b = [0, 0, 0],
        c = magnitudevertex(a);
    b[0] = a[0] / c;
    b[1] = a[1] / c;
    b[2] = a[2] / c;
    return b
}
window.normalisevertex = normalisevertex;

function vectorproduct(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
}
window.vectorproduct = vectorproduct;

function scalarproduct(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}
window.scalarproduct = scalarproduct;

function multiplymatrix(a, b) {
    var c = [];
    c.length = 16;
    var d, e, f;
    for (e = 0; 4 > e; e++)
        for (d = 0; 4 > d; d++)
            for (f = c[d + 4 * e] = 0; 4 > f; f++) c[d + 4 * e] += a[f + 4 * e] * b[d + 4 * f];
    return c
}
window.multiplymatrix = multiplymatrix;

function applypersp(a) {
    v1[0] = viewangle / a[2] * a[0];
    v1[1] = viewangle / a[2] * a[1];
    v1[2] = a[2];
    return v1
}
window.applypersp = applypersp;

function applymat(a, b) {

     var c = [];
    c.lenth = 3;
   c[0] = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3];
    c[1] = a[4] * b[0] + a[5] * b[1] + a[6] * b[2] + a[7];
    c[2] = a[8] * b[0] + a[9] * b[1] + a[10] * b[2] + a[11];
    return c
}
window.applymat = applymat;

function applymatNpersp(a, b) {
    var c = [];
    c.lenth = 3;
    c[2] = a[8] * b[0] + a[9] * b[1] + a[10] * b[2] + a[11];
    c[0] = viewangle / c[2] * (a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3]);
    c[1] = viewangle / c[2] * (a[4] * b[0] + a[5] * b[1] + a[6] * b[2] + a[7]);
    return c
}
window.applymatNpersp = applymatNpersp;

function applymatNscale(a, b) {
     var c = [];
    c.lenth = 3;
   c[0] = (a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3])*scaleconst;
    c[1] = (a[4] * b[0] + a[5] * b[1] + a[6] * b[2] + a[7])*scaleconst;
    c[2] = (a[8] * b[0] + a[9] * b[1] + a[10] * b[2] + a[11])*scaleconst;
    return c
}
window.applymatNscale = applymatNscale;

function genimat() {
    var a = [];
    a.length = 16;
    var b, c;
    for (b = 0; 4 > b; b++)
        for (c = 0; 4 > c; c++) a[b + 4 * c] = b == c ? 1 : 0;
    return a
}
window.genimat = genimat;

function gentmat(a, b, c) {
    var d = genimat();
    d[3] = a;
    d[7] = b;
    d[11] = c;
    return d
}
window.gentmat = gentmat;
function gentmatfromvector(vect) {

	var a = vect.s[0]*vect.n;
	var b = vect.s[1]*vect.n;
	var c = vect.s[2]*vect.n;

	var d = genimat();

	d[3] = a;
	d[7] = b;
	d[11] = c;
	return d;
}
window.gentmatfromvector = gentmatfromvector;

function genscalemat(scale) {

	var d = genimat();

	d[0] = scale;
	d[5] = scale;
	d[10] = scale;
	d[15] = scale;

	return d;
}
window.genscalemat = genscalemat;

function genrmat(a, b, c) {
    a *= Math.PI / 180;
    var d = Math.PI / 180 * b,
        e = Math.PI / 180 * c;
    c = genimat();
    b = Math.cos(a);
    a = Math.sin(a);
    var f = Math.cos(d);
    d = Math.sin(d);
    var g = Math.cos(e);
    e = Math.sin(e);
    var h = b * d,
        k = a * d;
    c[0] = f * g;
    c[1] = -f * e;
    c[2] = -d;
    c[4] = -k * g + b * e;
    c[5] = k * e + b * g;
    c[6] = -a * f;
    c[8] = h * g + a * e;
    c[9] = -h * e + a * g;
    c[10] = b * f;
    c[3] = c[7] = c[11] = c[12] = c[13] = c[14] = 0;
    c[15] = 1;
    return c
}
window.genrmat = genrmat;
function axe_ang_to_mat ( axe, ang )
{
	var matrix = genimat();
	var rcos = Math.cos( ang );
	var rsin = Math.sin( ang );
	matrix[0] =           rcos + axe[0]*axe[0]*(1-rcos);
	matrix[4] =  axe[2] * rsin + axe[1]*axe[0]*(1-rcos);
	matrix[8] = -axe[1] * rsin + axe[2]*axe[0]*(1-rcos);
	matrix[1] = -axe[2] * rsin + axe[0]*axe[1]*(1-rcos);
	matrix[5] =           rcos + axe[1]*axe[1]*(1-rcos);
	matrix[9] =  axe[0] * rsin + axe[2]*axe[1]*(1-rcos);
	matrix[2] =  axe[1] * rsin + axe[0]*axe[2]*(1-rcos);
	matrix[6] = -axe[0] * rsin + axe[1]*axe[2]*(1-rcos);
	matrix[10] =          rcos + axe[2]*axe[2]*(1-rcos);
	matrix[3] =  matrix[7] = matrix[11] = matrix[12] = matrix[13] = matrix[14] = 0;
	matrix[15] =  1;
	return matrix;
}
window.axe_ang_to_mat = axe_ang_to_mat;
function geninterpmat (vs, ve)
{	
	l(' ## interpolation', 'lg');
	var scal, ang;
	var frmat = genimat ();
	var m = new THREE.Matrix4();
	
	// matrice de translation :
	//var translatevector = vectfromvertices( ve.o, vs.o );
	
	var a = ve.o[0] - vs.o[0];
	var b = ve.o[1] - vs.o[1];
	var c = ve.o[2] - vs.o[2];
	var ftmat = gentmat(a, b, c);

	
	// verrification du cas d'alignement des vecteurs :
	var aligntestvector = vectfromvertices( vs.s, ve.s );
	

	if ( aligntestvector.n == 0 )
	{
		// les vecteurs sont de meme sens, une matrice d'identté suffit
		// pour la rotation
		frmat = genimat ();
	}
	else if ( aligntestvector.n == 2 )
	{
		fl('OPPOSED TARGET');
	//TODO /!\ IMPORTANT
	// Les vecteur sont de sens opposés, un vecteur aligné a leurs plan normal
	// doit etre defini pour effectuer une rotation de 180°
	}
	else
	{
		var a = vs.s;
		var b = ve.s;
		
		var vp = vectorproduct ( a, b);	
		vp = normalisevertex (vp);
		var sp = scalarproduct ( a, b );
		// FREAK solution
		if ( sp > 1.0 && sp < 1.000001) sp = 1.0;
		if ( sp < -1.0 && sp > -1.000001) sp = 1.0;
		
      var ang = Math.acos (sp);
      
		frmat = axe_ang_to_mat (vp , ang );
	}
	var mat = gentmat( -vs.o[0], -vs.o[1], -vs.o[2]);
	var mat3 = gentmat( ve.o[0], ve.o[1], ve.o[2]);
	var mat2 = multiplymatrix (frmat, mat);

	var finalmat = multiplymatrix (mat3, mat2);

	return finalmat;

}
window.geninterpmat = geninterpmat;


/** @constructor */

function Plot(x, y) {
    this.x = x;
    this.y = y;
}

//Barycentric collision checker
function checkCollision (pa, pb, pc, pt)
{
	var v0 = new Plot ( pc.x-pa.x, pc.y-pa.y );
	var v1 = new Plot ( pb.x-pa.x, pb.y-pa.y );
	var v2 = new Plot ( pt.x-pa.x, pt.y-pa.y );

	var dp00 = v0.x*v0.x + v0.y*v0.y;
	var dp11 = v1.x*v1.x + v1.y*v1.y;
	var dp22 = v2.x*v2.x + v2.y*v2.y;
	var dp01 = v0.x*v1.x + v0.y*v1.y;
	var dp02 = v0.x*v2.x + v0.y*v2.y;
	var dp12 = v1.x*v2.x + v1.y*v2.y;
	
	var u = ( dp11 * dp02 - dp01 * dp12 ) / ( dp00 * dp11 - dp01 * dp01 );
	var v = ( dp00 * dp12 - dp01 * dp02 ) / ( dp00 * dp11 - dp01 * dp01 );
	
	console.log ('u = '+u+'\n v = '+v);
	console.log(' collision : '+(u >= 0) && (v >= 0) && (u + v < 1) );
	
	return (u >= 0) && (v >= 0) && (u + v < 1);

}



