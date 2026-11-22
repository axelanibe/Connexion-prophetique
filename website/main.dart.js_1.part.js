((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={Ih:function Ih(){},WR:function WR(d){this.$ti=d},b3v:function b3v(d){this.a=d},b3w:function b3w(d,e){this.a=d
this.b=e},
cuv(d){var x
B.c7O()
if(d.length===0)return
x=A.c0(new B.c9w(d))
self.window.addEventListener("beforeunload",x)
$.chi=new B.c9v(x)},
c7O(){var x=$.chi
if(x!=null)x.$0()
$.chi=null},
c9w:function c9w(d){this.a=d},
c9v:function c9v(d){this.a=d},
a7q(d){var x,w,v,u,t=new B.azT(),s=J.L(d),r=s.h(d,"id")
r=J.l(r==null?"":r)
x=s.h(d,"conversation_id")
J.l(x==null?"":x)
x=s.h(d,"appelant_id")
x=J.l(x==null?"":x)
w=s.h(d,"appelant_nom")
w=J.l(w==null?"":w)
A.an(s.h(d,"appele_id"))
A.an(s.h(d,"appele_nom"))
v=s.h(d,"type")
v=J.l(v==null?"audio":v)
u=s.h(d,"statut")
u=J.l(u==null?"sonne":u)
t.$1(s.h(d,"cree_le"))
t.$1(s.h(d,"repondu_le"))
return new B.azS(r,x,w,v,u)},
cfQ(d){var x,w,v,u=J.L(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mK(t,y.N,y.z):C.bn
if(u.h(d,"cree_le")!=null)A.bV(J.l(u.h(d,"cree_le")))
return new B.LC(s,x,w,v)},
cE2(d){var x,w,v,u,t,s,r=J.L(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.ZI
x=A.a([],y.t)
for(r=J.as(q),w=y.f,v=y.P,u=y.N,t=y.z;r.B();){s=r.gJ(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mK(s,u,t))}return new B.a91(x)},
cvk(d){var x=J.L(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oV(v)
if(!x.p(v,"offer")&&!x.p(v,"answer"))return null
return new A.aqj(w,v)},
cUG(d){var x,w,v=J.L(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.aqm(u,A.i2(w)?w:null,v)},
azS:function azS(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
azT:function azT(){},
LC:function LC(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a91:function a91(d){this.a=d},
cmp(d,e,f,g,h,i,j){return new B.qR(f,g,j,i,e,d,null)},
ce8(d,e,f,g,h,i,j,k,l,m){return new B.qQ(f,m,h,l,i,d,j,k,e,g,null)},
crf(d,e,f,g,h,i,j,k,l,m,n){return new B.aku(e,g,f,d,n,j,i,h,m,k,l,null)},
ctg(d,e){var x=null
return new A.W(D.rQ,A.c(d.toUpperCase(),2,C.a4,x,x,A.c6(x,x,C.m,x,x,x,x,x,"Cinzel",x,x,e,x,x,C.A,x,x,!0,x,1.2,x,x,x,x,x,x),C.X,x,x),x)},
qR:function qR(d,e,f,g,h,i,j){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.y=i
_.a=j},
a_F:function a_F(){var _=this
_.d=!0
_.f=_.e=!1
_.x=_.w=_.r=null
_.y=$
_.Q=_.z=!1
_.c=_.a=null},
buO:function buO(d){this.a=d},
buP:function buP(d){this.a=d},
buL:function buL(d){this.a=d},
buM:function buM(d){this.a=d},
buI:function buI(d){this.a=d},
buJ:function buJ(d){this.a=d},
buK:function buK(d){this.a=d},
buF:function buF(d){this.a=d},
buG:function buG(d){this.a=d},
buH:function buH(d){this.a=d},
buN:function buN(d){this.a=d},
Z6:function Z6(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
qQ:function qQ(d,e,f,g,h,i,j,k,l,m,n){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.w=i
_.x=j
_.y=k
_.z=l
_.as=m
_.a=n},
a_E:function a_E(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=""
_.w=null
_.at=_.as=_.Q=_.z=_.y=_.x=!1
_.ax=!0
_.ay=null
_.ch=e
_.dx=_.db=_.cy=_.cx=_.CW=null
_.dy=$
_.fr=!1
_.fx=null
_.go=_.fy=!1
_.c=_.a=null},
buq:function buq(d){this.a=d},
bur:function bur(d){this.a=d},
bup:function bup(d){this.a=d},
bus:function bus(d){this.a=d},
but:function but(){},
buu:function buu(d){this.a=d},
buo:function buo(d,e){this.a=d
this.b=e},
buv:function buv(){},
buw:function buw(d){this.a=d},
bu8:function bu8(d){this.a=d},
bu9:function bu9(d){this.a=d},
bua:function bua(d){this.a=d},
bub:function bub(d){this.a=d},
bu7:function bu7(d){this.a=d},
buc:function buc(d){this.a=d},
bud:function bud(d){this.a=d},
bue:function bue(d){this.a=d},
bu6:function bu6(d,e){this.a=d
this.b=e},
buf:function buf(){},
bug:function bug(d){this.a=d},
buy:function buy(d){this.a=d},
buz:function buz(d){this.a=d},
buA:function buA(d){this.a=d},
buB:function buB(d){this.a=d},
buC:function buC(d){this.a=d},
buD:function buD(d){this.a=d},
bul:function bul(d,e){this.a=d
this.b=e},
bum:function bum(d){this.a=d},
bun:function bun(d){this.a=d},
bux:function bux(){},
bu5:function bu5(d,e){this.a=d
this.b=e},
bu4:function bu4(d,e){this.a=d
this.b=e},
bu3:function bu3(d,e){this.a=d
this.b=e},
bui:function bui(d){this.a=d},
buj:function buj(d){this.a=d},
buh:function buh(d){this.a=d},
buk:function buk(d){this.a=d},
buE:function buE(d){this.a=d},
aku:function aku(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.w=i
_.x=j
_.y=k
_.z=l
_.Q=m
_.as=n
_.a=o},
Z7:function Z7(d,e){this.c=d
this.a=e},
A4:function A4(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
NP:function NP(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
ap7:function ap7(d,e){var _=this
_.d=$
_.eK$=d
_.bS$=e
_.c=_.a=null},
bQs:function bQs(d,e){this.a=d
this.b=e},
a5P:function a5P(){},
b2T:function b2T(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.z=_.y=_.x=!1},
b2U:function b2U(d){this.a=d},
b2V:function b2V(d){this.a=d},
b2W:function b2W(d){this.a=d},
a8O:function a8O(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aDD:function aDD(d){this.a=d},
aDE:function aDE(d){this.a=d},
cay(d){var x=y.U,w=A.H(new A.V(A.a(d.split(" "),y.s),new B.caz(),x),!0,x.i("w.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.m(C.b.gU(w),0).toUpperCase()
return(J.m(C.b.gU(w),0)+J.m(C.b.gaZ(w),0)).toUpperCase()},
caz:function caz(){},
acI:function acI(){this.a=null},
aYB:function aYB(){},
us:function us(d,e){this.e=d
this.b=e},
aTq:function aTq(d){this.a=d},
aTr:function aTr(d){this.a=d},
ceY(d){var x=new B.adb(d)
x.aGV(d)
return x},
adb:function adb(d){this.d=d},
aTn:function aTn(d){this.a=d},
aTo:function aTo(d){this.a=d},
aTp:function aTp(d){this.a=d},
aTa:function aTa(){},
aTc:function aTc(){},
aTd:function aTd(){},
aTe:function aTe(d){this.a=d},
aTb:function aTb(d){this.a=d},
cK9(d,e){var x=y.N
x=new B.af3(d,e,A.C(x,y.E),A.C(x,y.z))
x.aH3(d,e)
return x},
af3:function af3(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aYD:function aYD(d){this.a=d},
aYE:function aYE(d){this.a=d},
aYF:function aYF(d){this.a=d},
aYG:function aYG(d){this.a=d},
aYH:function aYH(d){this.a=d},
aYI:function aYI(d){this.a=d},
aYJ:function aYJ(d){this.a=d},
aYK:function aYK(d){this.a=d},
aYC:function aYC(d){this.a=d},
af4:function af4(){},
cfD:function cfD(d){this.a=d},
cX4(){return C.b.nT(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.caI())!==-1},
caI:function caI(){},
cp6(){var x=A.a([],y.d),w=$.cp7
$.cp7=w+1
return new B.Vc(w,x,D.awc,$.af())},
Vc:function Vc(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.db$=0
_.dx$=g
_.fr$=_.dy$=0},
aYQ:function aYQ(d){this.a=d},
aYM:function aYM(d){this.a=d},
aYN:function aYN(d){this.a=d},
aYO:function aYO(d){this.a=d},
aYP:function aYP(){},
cfE(d,e,f){return new B.Ve(d,f,e,null)},
Ve:function Ve(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Vf:function Vf(){this.c=this.a=null},
aYR:function aYR(){},
aYT:function aYT(d){this.a=d},
aYS:function aYS(d){this.a=d},
cn3(d,e,f,g){var x,w={}
w.a=d
x=new B.abk(g.i("abk<0>"))
x.aGC(e,f,w,g)
return x},
abk:function abk(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aMd:function aMd(d,e){this.a=d
this.b=e},
aMc:function aMc(d){this.a=d},
a0y:function a0y(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bzT:function bzT(){},
ahr:function ahr(d){this.b=this.a=$
this.$ti=d},
ahs:function ahs(){},
cdv(d,e){return B.cDb(d,e)},
cDb(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$cdv=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.q3("ws")&&!d.q3("wss"))throw A.o(A.fO(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.l(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.Br(r,A.h4(null,null,null,!1,y.D))
u=new A.aC($.aL,y.u)
p=new A.bf(u,y.V)
if(J.r(r.readyState,1))p.cH(0,q)
else if(J.r(r.readyState,2)||J.r(r.readyState,3))p.hB(new B.MB("Unexpected WebSocket state: "+A.u(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.qa(r,"open",!1,y.C).gU(0).aL(new B.aC9(p,q),y.H)
t=y.C
s=y.H
new A.qa(r,"error",!1,t).gU(0).aL(new B.aCa(p,q),s)
A.iL(r,"message",new B.aCb(q),!1,y.m)
new A.qa(r,"close",!1,t).gU(0).aL(new B.aCc(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$cdv,w)},
Br:function Br(d,e){this.a=d
this.b=e},
aC9:function aC9(d,e){this.a=d
this.b=e},
aCa:function aCa(d,e){this.a=d
this.b=e},
aCb:function aCb(d){this.a=d},
aCc:function aCc(d,e){this.a=d
this.b=e},
cgj(){return new B.MA("Connection Closed")},
vp:function vp(){},
M0:function M0(d){this.a=d},
Hf:function Hf(d){this.a=d},
HH:function HH(d,e){this.a=d
this.b=e},
MB:function MB(d){this.a=d},
MA:function MA(d){this.a=d},
cCD(d){var x=null,w=$.aL,v=new B.ahr(y.Z),u=y.X,t=A.h4(x,x,x,!0,u),s=A.h4(x,x,x,!0,u),r=A.x(s),q=A.x(t)
v.a=B.cn3(new A.cP(s,r.i("cP<1>")),new A.Gr(t,q.i("Gr<1>")),!0,u)
v.b=B.cn3(new A.cP(t,q.i("cP<1>")),new A.Gr(s,r.i("Gr<1>")),!1,u)
v=new B.axO(new A.bf(new A.aC(w,y.W),y.R),v)
v.aGk(d)
return v},
axO:function axO(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
axS:function axS(d){this.a=d},
axP:function axP(d){this.a=d},
axQ:function axQ(d){this.a=d},
axR:function axR(d,e){this.a=d
this.b=e},
axT:function axT(d){this.a=d},
aum:function aum(d,e){this.b=d
this.a=e},
aiO:function aiO(d){this.a=d},
cWD(d){switch(d){case"new":return D.aw_
case"checking":return D.aw0
case"connected":return D.aw2
case"completed":return D.aw1
case"failed":return D.OW
case"disconnected":return D.aw4
case"closed":return D.OX
case"count":return D.aw3}return D.OX},
cWE(d){switch(d){case"new":return D.OY
case"gathering":return D.aw5
case"complete":return D.aw6}return D.OY},
cYQ(d){switch(d){case"stable":return D.aw7
case"have-local-offer":return D.aw8
case"have-local-pranswer":return D.awa
case"have-remote-offer":return D.aw9
case"have-remote-pranswer":return D.awb
case"closed":return D.P3}return D.P3},
cXZ(d){switch(d){case"new":return D.P0
case"connecting":return D.P1
case"connected":return D.P2
case"closed":return D.vh
case"disconnected":return D.P_
case"failed":return D.OZ}return D.vh},
z8:function z8(d,e){this.a=d
this.b=e},
V8:function V8(d,e){this.a=d
this.b=e},
z7:function z7(d,e){this.a=d
this.b=e},
om:function om(d,e){this.a=d
this.b=e},
af5:function af5(d,e){this.a=d
this.b=e},
aYA:function aYA(){},
TC:function TC(){},
JT:function JT(){},
aT9:function aT9(){},
KJ:function KJ(d,e,f){this.a=d
this.b=e
this.c=f},
V9:function V9(){},
Va:function Va(){},
aYL:function aYL(){},
Ey:function Ey(d,e){this.a=d
this.b=e},
Vb:function Vb(d){this.b=d},
Vd:function Vd(d,e,f){this.a=d
this.b=e
this.c=f},
cez(d){var x=0,w=A.k(y.y)
var $async$cez=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.o("The is not a video track => "+d.l(0))
throw A.o("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$cez,w)},
adz(d){var x=0,w=A.k(y.H),v
var $async$adz=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.b8r("enableSpeakerphone",A.a6(["enable",d],y.N,v),v,v),$async$adz)
case 2:return A.i(null,w)}})
return A.j($async$adz,w)},
aVq(d,e){var x=0,w=A.k(y.H),v,u,t
var $async$aVq=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.mK(y.f.a(A.c9g(t.getConstraints())),y.N,y.z)
u.j(0,"volume",d)
x=5
return A.e(e.V0(0,u),$async$aVq)
case 5:case 4:v=A.d2(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aVq,w)},
b8r(d,e,f,g){return B.cNK(d,e,f,g,f.i("0?"))},
cNK(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$b8r=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.b8q(),$async$b8r)
case 3:v=D.Kj.cm(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$b8r,w)},
b8q(){var x=0,w=A.k(y.H),v,u
var $async$b8q=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.cr0?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Kj.cm("initialize",A.a6(["options",A.C(v,u)],v,u),!1,y.H),$async$b8q)
case 4:$.cr0=!0
case 3:return A.i(null,w)}})
return A.j($async$b8q,w)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[26]
B.Ih.prototype={
E(d,e){this.a.E(0,e)},
dA(d,e){this.a.dA(d,e)},
a9(d){return this.a.a9(0)},
$ie6:1}
B.WR.prototype={
hO(d){var x=A.cE("subscription"),w=A.h4(new B.b3v(x),null,null,!0,this.$ti.y[1])
x.b=d.fM(new B.b3w(this,w),w.gnL(w),w.gpB())
return new A.cP(w,A.x(w).i("cP<1>"))}}
B.azS.prototype={}
B.LC.prototype={}
B.a91.prototype={}
B.qR.prototype={
P(){return new B.a_F()}}
B.a_F.prototype={
S(){var x,w,v=this
v.W()
x=v.a
x.toString
v.z=!0
w=new B.acI()
v.y!==$&&A.aK()
v.y=w
if(!x.y)w.ud(A.BE(C.lk,$.w0().a).c)
v.Q0()
v.r=A.du(C.c9,new B.buO(v))
v.w=A.hp(C.rF,new B.buP(v))},
m(){var x=this,w=x.r
if(w!=null)w.Y(0)
w=x.w
if(w!=null)w.Y(0)
w=x.x
if(w!=null)w.Y(0)
w=x.y
w===$&&A.d()
w.is()
if(x.z)w.hr()
x.a3()},
a3Y(){var x=this.x
if(x!=null)x.Y(0)
this.x=A.du(C.fW,new B.buL(this))},
Uv(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Uv=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.Y()
x=7
return A.e(o.Ey(p.c),$async$Uv)
case 7:r=e
q=B.a7q(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.k(new B.buM(s))
p=s.r
if(p!=null)p.Y(0)
p=s.w
if(p!=null)p.Y(0)
p=s.y
p===$&&A.d()
p.is()
s.a3Y()}u=2
x=6
break
case 4:u=3
m=t
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Uv,w)},
Q0(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$Q0=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.Y()
x=7
return A.e(n.Ey(o.c),$async$Q0)
case 7:r=e
q=B.a7q(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gwV()
p=m
if(q.w!=="sonne"||q.c===p){s.k(new B.buI(s))
o=s.y
o===$&&A.d()
o.is()
s.a3Y()
x=1
break}s.k(new B.buJ(s))
if(s.a.y)s.H_()
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.k(new B.buK(s))
o=s.y
o===$&&A.d()
o.is()
s.a3Y()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Q0,w)},
H_(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$H_=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.Q=!0
s.k(new B.buF(s))
u=4
q=s.a
q.toString
p=$.Y()
x=7
return A.e(p.LQ(q.c,"accepte"),$async$H_)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.M(n)
if(s.c==null){x=1
break}s.k(new B.buG(s))
q=s.c
q.toString
p=J.l(r)
q.t(y.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(p,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
x=1
break
x=6
break
case 3:x=2
break
case 6:if(s.c==null){x=1
break}q=s.r
if(q!=null)q.Y(0)
q=s.w
if(q!=null)q.Y(0)
q=s.y
q===$&&A.d()
q.is()
q=s.c
q.toString
A.a2(q,!1).AA(A.ef(new B.buH(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$H_,w)},
JA(d){return this.b5E(d)},
b5D(){return this.JA(!1)},
b5E(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$JA=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.Y(0)
r=s.w
if(r!=null)r.Y(0)
r=s.y
r===$&&A.d()
r.is()
u=4
r=s.a
r.toString
q=$.Y()
x=7
return A.e(q.LQ(r.c,"refuse"),$async$JA)
case 7:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:r=s.c
if(r!=null)A.a2(r,!1).bN()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$JA,w)},
D(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.jM(C.t,s,A.c(B.cay(r.d),s,s,s,s,D.aDl,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.b("Un membre"):x,s,s,s,s,D.aD7,C.X,s,s)
if(t.d)q=A.b("Connexion\u2026")
else if(t.e)q=A.b("Appel termin\xe9")
else q=q==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
w=y.p
q=A.a([r,C.aw,new A.W(D.rQ,x,s),C.k,A.c(q,s,s,s,s,D.wA,s,s,s),D.aA8],w)
if(!t.d&&!t.e){r=A.b("Refuser")
x=t.f?s:new B.buN(t)
v=A.b("Accepter")
u=t.f?s:t.gaHN()
q.push(A.O(A.a([new B.Z6(D.BJ,C.aG,r,x,s),D.azW,new B.Z6(C.nO,C.d_,v,u,s)],w),C.n,C.bA,C.i,s))}if(t.d)q.push(C.z6)
return A.e0(s,C.o,A.ft(!0,A.cz(A.I(q,C.n,C.f,C.N),s,s),!0,C.Z,!0,!0),s,s,s)}}
B.Z6.prototype={
D(d){var x=this,w=null,v=A.dk(x.d,w,w,C.Z,C.cK,w)
return A.I(A.a([A.ab(A.b4(!1,A.c1(x.c,C.m,w,32),C.j,w,C.p,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.dK,w,w,w)],y.p),C.n,C.f,C.N)}}
B.qQ.prototype={
P(){return new B.a_E(A.b8(y.N),C.R)}}
B.a_E.prototype={
S(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.W()
x=o.a
o.r=x.c
x=x.x
if(x==null)x=new B.b2T(B.cp6(),B.cp6())
o.d!==$&&A.aK()
o.d=x
w=o.a
v=w.y
if(v==null)v=new B.a8O(new A.dT(n,n,y.g),new A.dT(n,n,y.n))
o.e!==$&&A.aK()
o.e=v
o.fr=!0
u=new B.acI()
o.dy!==$&&A.aK()
o.dy=u
t=w.x
if(t!=null){s=$.kY()
r=s.a
q=r.length!==0&&s.z===t&&r===w.c&&s.w}else q=!1
t=$.kY()
s=o.r
r=w.e
p=w.d
t.bil(s,r,x,v,w.f,p)
x=o.a
if(x.as)t.as=!0
if(q){o.Ty()
return}if(x.f)u.ud("assets/audio/tonalite-appel.wav")
o.t5()},
m(){var x=this,w=x.CW
if(w!=null)w.Y(0)
w=x.cx
if(w!=null)w.Y(0)
w=x.cy
if(w!=null)w.Y(0)
w=x.db
if(w!=null)w.Y(0)
w=x.dx
if(w!=null)w.Y(0)
w=x.dy
w===$&&A.d()
w.is()
if(x.fr)w.hr()
w=$.kY()
if(!(w.r&&w.a===x.r&&!x.y)){B.c7O()
w=x.d
w===$&&A.d()
w.hr()
w=x.e
w===$&&A.d()
w.Lv()}x.a3()},
Ty(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$Ty=A.f(function(d,e){if(d===1){t=e
x=u}while(true)$async$outer:switch(x){case 0:s.a.toString
o=$.Y()
s.w=o.gwV()
n=$.kY()
s.Q=n.x
s.as=n.y
s.x=n.e
n=n.f
s.ay=n
if(n!=null){n=Date.now()
m=s.ay
m.toString
s.ch=new A.aw(n,0,!1).ev(m)}B.cuv(s.r)
u=4
s.a.toString
x=7
return A.e(o.bX("/messagerie/appels/"+s.r+"/signaux"),$async$Ty)
case 7:r=e
for(o=J.as(r),n=s.f;o.B();){q=o.gJ(o)
p=B.cfQ(q)
n.E(0,p.a)
if(p.d==="termine"||p.d==="refuse"||p.d==="annule"){s.mJ(A.b("Appel termin\xe9"))
x=1
break $async$outer}}u=2
x=6
break
case 4:u=3
k=t
x=6
break
case 3:x=2
break
case 6:o=s.c!=null
if(!o||s.y){x=1
break}n=s.d
n===$&&A.d()
n.f=new B.buq(s)
n.r=new B.bur(s)
n.w=new B.bus(s)
s.z=!0
if(o)s.k(new B.but())
s.cy=A.hp(C.ce,new B.buu(s))
o=s.e
o===$&&A.d()
n=o.r
s.db=new A.ca(n,A.x(n).i("ca<1>")).cP(s.gaoj())
o=o.w
s.dx=new A.ca(o,A.x(o).i("ca<1>")).cP(new B.buv())
s.CW=A.hp(C.fW,new B.buw(s))
s.ym()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Ty,w)},
t5(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,a0
var $async$t5=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:s.cx=A.du(C.c9,new B.bu8(s))
r="appel"
u=4
q=null
h=s.a
g=h.z
x=g!=null?7:9
break
case 7:x=10
return A.e(g,$async$t5)
case 10:q=a2
h=s.r=B.a7q(q).a
x=8
break
case 9:g=$.Y()
x=11
return A.e(g.Ey(h.c),$async$t5)
case 11:q=a2
h=s.r=s.a.c
case 8:g=$.kY()
g.bi6(h)
B.cuv(s.r)
if(s.a.f)g.VU()
p=B.a7q(q)
if(s.c==null){x=1
break}h=p.w
if(h==="termine"||h==="expire"){s.mJ(A.b("Appel termin\xe9"))
x=1
break}s.a.toString
h=$.Y()
s.w=h.gwV()
r="ice"
s.a.toString
o=h.Wv()
n=s.Ji()
x=12
return A.e(o,$async$t5)
case 12:m=a2
l=B.cE2(m)
x=15
return A.e(n,$async$t5)
case 15:x=!a2?13:14
break
case 13:if(s.c==null){x=1
break}s.k(new B.bu9(s))
x=16
return A.e(A.jR(C.kX,null,y.z),$async$t5)
case 16:if(s.c==null){x=1
break}s.mJ(null)
x=1
break
case 14:r="webrtc"
f=s.d
f===$&&A.d()
e=s.a.d
x=17
return A.e(f.Ay(A.a6(["iceServers",l.a],y.N,y.z),e==="video"),$async$t5)
case 17:f.f=new B.bua(s)
f.r=new B.bub(s)
f.w=new B.buc(s)
if(s.c==null){x=1
break}s.k(new B.bud(s))
g.bok()
s.cy=A.hp(C.ce,new B.bue(s))
g=s.e
g===$&&A.d()
f=g.r
s.db=new A.ca(f,A.x(f).i("ca<1>")).cP(s.gaoj())
f=g.w
s.dx=new A.ca(f,A.x(f).i("ca<1>")).cP(new B.buf())
s.a.toString
k=h.b
if(k!=null&&J.a8(k)!==0){s.a.toString
g.Vr(C.d.jg("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.dG(C.bL,k,C.a6,!0))}s.CW=A.hp(C.fW,new B.bug(s))
s.ym()
u=2
x=6
break
case 4:u=3
a0=t
j=A.M(a0)
i=A.bo(a0)
if(s.c==null){x=1
break}A.td().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(r)+" : "+A.u(j)+"\n"+A.u(i))
h=s.c
h.toString
g=j instanceof A.ds?j.a:s.b_K(r)
h.t(y.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(g,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
s.mJ(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$t5,w)},
b_K(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
Ji(){var x=0,w=A.k(y.y),v,u=2,t,s=this,r,q,p
var $async$Ji=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e(s.a0v(),$async$Ji)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.d()
x=8
return A.e(r.Fl(s.a.d==="video"),$async$Ji)
case 8:v=!0
x=1
break
u=2
x=6
break
case 4:u=3
p=t
v=!1
x=1
break
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Ji,w)},
a0v(){var x=0,w=A.k(y.y),v
var $async$a0v=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a0v,w)},
ym(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$ym=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.Y()
x=7
return A.e(p.bX("/messagerie/appels/"+s.r+"/signaux"),$async$ym)
case 7:r=e
for(p=J.as(r);p.B();){q=p.gJ(p)
s.aok(B.cfQ(q))}u=2
x=6
break
case 4:u=3
n=t
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$ym,w)},
aok(d){var x,w,v,u,t,s=this
if(s.c==null||s.y)return
x=s.f
w=d.a
if(x.q(0,w))return
x.E(0,w)
x=s.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.cvk(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.E1(A.a6(["sdp",v.a,"type",v.b],y.N,y.z)).aL(new B.buy(s),y.a).fJ(new B.buz(s))
break
case"reponse":if(!s.a.f)return
u=B.cvk(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.V_(A.a6(["sdp",u.a,"type",u.b],y.N,y.z)).aL(new B.buA(s),y.a).fJ(new B.buB(s))
break
case"candidat_ice":t=B.cUG(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.UV(A.a6(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.x)return
x=s.d
x===$&&A.d()
x.Lm().aL(new B.buC(s),y.a).fJ(new B.buD(s))
break
case"refuse":s.mJ(A.b("Appel refus\xe9"))
break
case"annule":s.mJ(A.b("Appel annul\xe9"))
break
case"termine":s.mJ(A.b("Appel termin\xe9"))
break}},
T6(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$T6=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:if(u.x){x=1
break}t=u.cx
if(t!=null)t.Y(0)
t=u.dy
t===$&&A.d()
t.is()
u.k(new B.bul(u,!1))
t=$.kY()
t.bqc()
s=u.Q
t.a92(u.as,s)
case 1:return A.i(v,w)}})
return A.j($async$T6,w)},
yc(d,e,f){return this.aQN(d,e,f)},
ah_(d,e){return this.yc(d,e,!0)},
aQN(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$yc=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.Y()
x=6
return A.e(s.asr(t.r,e,d),$async$yc)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(f&&t.c!=null&&!t.y)t.mJ(A.b("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$yc,w)},
Ju(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Ju=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.cx
if(r!=null)r.Y(0)
r=s.dy
r===$&&A.d()
r.is()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.Y()
x=9
return A.e(q.LQ(r,"termine"),$async$Ju)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:B.c7O()
$.kY().NT()
r=s.c
if(r!=null)A.a2(r,!1).bN()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Ju,w)},
alD(){var x=this
if(!x.x||x.y)return
$.kY().bru()
x.k(new B.bum(x))
$.aR.aD$.push(new B.bun(x))},
mJ(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.cx
if(x!=null)x.Y(0)
x=v.dy
x===$&&A.d()
x.is()
x=v.r
if(x.length!==0){v.a.toString
w=$.Y()
w.LQ(x,"termine").fJ(new B.bux())}if(d!=null&&v.c!=null)v.c.t(y.q).f.v(A.z(u,u,u,u,u,C.h,u,A.c(d,u,u,u,u,u,u,u,u),u,C.l,u,u,u,u,u,u,u,u,u))
B.c7O()
$.kY().NT()
x=v.c
if(x!=null)A.a2(x,!1).bN()},
Qb(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Qb=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.a_m(u),$async$Qb)
case 2:if(v.c!=null)v.k(new B.bu5(v,u))
$.kY().a92(v.as,u)
return A.i(null,w)}})
return A.j($async$Qb,w)},
Qa(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Qa=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v.at=!1
u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.GA(u),$async$Qa)
case 2:if(v.c!=null)v.k(new B.bu4(v,u))
$.kY().a92(u,v.Q)
return A.i(null,w)}})
return A.j($async$Qa,w)},
Q7(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Q7=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.ax
t=v.d
t===$&&A.d()
x=2
return A.e(t.a_j(u),$async$Q7)
case 2:if(v.c!=null)v.k(new B.bu3(v,u))
return A.i(null,w)}})
return A.j($async$Q7,w)},
Q8(){var x=0,w=A.k(y.H),v=this,u
var $async$Q8=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.V6(),$async$Q8)
case 2:return A.i(null,w)}})
return A.j($async$Q8,w)},
anq(){var x,w=this,v="Appel en cours\u2026",u=w.fx
if(u!=null)return u
if(w.x){u=A.b(v)
x=C.c.ad(w.ch.a,1e6)
return u+" "+(C.d.aU(C.c.l(C.c.ad(x,60)),2,"0")+":"+C.d.aU(C.c.l(C.c.a0(x,60)),2,"0"))}if(w.z)return w.a.f?A.b("\xc7a sonne\u2026"):A.b(v)
return A.b("Connexion\u2026")},
bd1(){var x,w=null,v=this.c
v.toString
x=A.b("La vid\xe9o n\u2019est pas disponible pendant un appel audio.")
v.t(y.q).f.v(A.z(w,w,w,w,w,C.h,w,A.c(x,w,w,w,w,w,w,w,w),w,C.l,w,w,w,w,w,w,w,w,w))},
b2o(){var x,w=this,v=null,u=A.a([],y.p)
if(w.a.d==="video")u.push(A.bQ(!1,v,v,v,!0,v,v,!0,!1,D.a76,v,v,v,new B.bui(w),!1,v,v,v,v,v,A.c(A.b("Basculer"),v,v,v,v,C.dK,v,v,v),v,v))
if(w.x)u.push(A.bQ(!1,v,v,v,!0,v,v,!0,!1,D.a6R,v,v,v,new B.buj(w),!1,v,v,v,v,v,A.c(A.b("R\xe9duire"),v,v,v,v,C.dK,v,v,v),v,v))
if(u.length===0)return
x=w.c
x.toString
A.jF(D.zJ,new B.buk(u),x,!1,v,y.H)},
D(d){var x,w,v,u,t,s,r,q=this,p=null,o=q.d
o===$&&A.d()
x=o.c
w=q.go
v=q.a
if(v.d==="video"&&q.z){if(x!=null)x=B.cfE(o.e,!1,D.P4)
else{x=v.e
v=v.r
u=q.fy&&q.x
x=A.cz(A.I(A.a([new B.NP(x,v,u,56,p),C.q,B.ctg(x,22),C.k,A.c(q.anq(),p,p,p,p,D.wA,p,p,p)],y.p),C.n,C.f,C.N),p,p)}o=A.a([A.Er(0,x),A.f3(p,A.eI(A.P(12),B.cfE(o.d,!0,D.P4),C.ap),160,p,p,16,16,110)],y.p)
if(q.x)o.push(A.f3(p,new B.Z7(q.galC(),p),p,p,16,p,16,p))
x=q.Q
v=q.as
o.push(A.f3(24,B.crf(q.ax,!0,v,x,q.gaec(),q.gaed(),q.gaee(),q.gakI(),q.galf(),q.gapn(),!0),p,p,0,0,p,p))
o=A.e1(C.aP,o,C.h,C.aH,p)}else{x=y.p
v=A.a([],x)
if(q.fy)v.push(A.f3(p,A.re(B.cfE(o.e,!1,D.vi),0),1,p,0,p,0,1))
if(q.x)v.push(A.f3(p,new B.Z7(q.galC(),p),p,p,16,p,16,p))
o=B.ctg(q.a.e,24)
u=A.c(q.anq(),p,p,p,p,D.wA,C.X,p,p)
t=q.a
s=t.e
t=t.r
t=A.a9(A.cz(new B.NP(s,t,q.fy&&q.x,88,p),p,p),1,p)
s=q.Q
r=q.as
v.push(A.I(A.a([C.q,o,C.k,new A.W(D.rQ,u,p),t,B.crf(q.ax,!1,r,s,q.gaec(),q.gaed(),q.gaee(),q.gakI(),q.galf(),q.gapn(),q.x),C.q],x),C.n,C.f,C.i))
v=A.e1(C.aP,v,C.h,C.aH,p)
o=v}return A.cfo(w,A.e0(p,C.o,A.ft(!0,o,!0,C.Z,!0,!0),p,p,p),new B.buE(q),y.K)}}
B.aku.prototype={
D(d){var x,w,v=this,u=null,t=A.P(28),s=A.a9(new B.A4(D.a4S,v.e,A.b("Haut-parleur"),v.x,u,u),1,u),r=v.f?D.BT:D.a4R,q=A.b("Appel vid\xe9o")
r=A.a9(new B.A4(r,!1,q,v.c?v.y:v.z,u,u),1,u)
q=v.d
x=q?D.a4N:D.a4M
w=y.p
q=A.O(A.a([s,r,A.a9(new B.A4(x,q,A.b("Muet"),v.w,u,u),1,u)],w),C.n,C.f,C.i,u)
x=A.b("Plus")
return A.R(u,A.I(A.a([q,C.q,A.O(A.a([A.a9(new B.A4(C.BQ,!1,x,v.r?v.Q:u,u,u),1,u),A.a9(new B.A4(D.BJ,!1,A.b("Terminer"),v.as,C.aG,u),1,u),D.a3D],w),C.n,C.f,C.i,u)],w),C.n,C.f,C.N),C.j,u,u,new A.a4(D.zJ,u,u,t,u,u,C.v),u,u,u,C.AP,D.a3l,u,u,u)}}
B.Z7.prototype={
D(d){var x=null
return A.I(A.a([A.ab(A.b4(!1,D.a6Q,C.j,x,C.p,x,x,x,x,this.c,x,A.dk(C.kQ,x,x,C.Z,C.cK,x)),48,48),C.H,A.c(A.b("R\xe9duire"),x,x,x,x,C.Rr,x,x,x)],y.p),C.n,C.f,C.N)}}
B.A4.prototype={
D(d){var x,w,v,u=this,t=null,s=u.r,r=s==null
if(r)s=u.d?C.m:C.kQ
if(!r)x=C.m
else x=u.d?C.o:C.m
r=u.f
w=r==null?0.4:1
v=A.dk(s,t,t,C.Z,C.cK,t)
return A.re(A.I(A.a([A.ab(A.b4(!1,A.c1(u.c,x,t,30),C.j,t,C.p,t,t,t,t,r,t,v),72,72),C.k,A.c(u.e,t,t,t,t,C.pA,C.X,t,t)],y.p),C.n,C.f,C.N),w)}}
B.NP.prototype={
P(){return new B.ap7(null,null)}}
B.ap7.prototype={
S(){var x,w=this
w.W()
x=A.cq(null,A.cY(0,0,w.a.e?1100:2400,0,0),null,1,null,w)
x.a9U(0,!0)
w.d!==$&&A.aK()
w.d=x},
aT(d){var x,w
this.bf(d)
x=this.a.e
if(d.e!==x){w=this.d
w===$&&A.d()
w.e=A.cY(0,0,x?1100:2400,0,0)
w.a9U(0,!0)}},
m(){var x=this.d
x===$&&A.d()
x.m()
this.aFA()},
D(d){var x,w=this,v=null,u=w.a,t=u.f,s=t*2,r=s+24,q=w.d
q===$&&A.d()
x=u.d
u=x!=null?A.jM(v,x,v,v,t):A.jM(C.t,v,A.c(B.cay(u.c),v,v,v,v,A.c6(v,v,C.o,v,v,v,v,v,v,v,v,w.a.f*0.7,v,v,C.A,v,v,!0,v,v,v,v,v,v,v,v),v,v,v),v,t)
return A.ab(A.i8(q,new B.bQs(w,s),u),r,r)}}
B.a5P.prototype={
m(){var x=this,w=x.bS$
if(w!=null)w.T(0,x.ghM())
x.bS$=null
x.a3()},
ce(){this.dc()
this.d0()
this.hN()}}
B.b2T.prototype={
Fl(d){return this.bq1(d)},
bq1(d){var x=0,w=A.k(y.H),v,u=this,t,s,r,q
var $async$Fl=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.e(t.jA(0),$async$Fl)
case 3:$.ciT()
s=y.N
r=A.a6(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
x=4
return A.e(new B.aTa().Gn(0,A.a6(["audio",r,"video",d&&A.a6(["facingMode","user"],s,s)],s,y.z)),$async$Fl)
case 4:q=f
u.b=q
t.sac8(0,q)
case 1:return A.i(v,w)}})
return A.j($async$Fl,w)},
Ay(d,e){return this.bqM(d,e)},
bqM(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q
var $async$Ay=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(v.e.jA(0),$async$Ay)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.e(v.Fl(e),$async$Ay)
case 5:case 4:u=v.b
u.toString
x=6
return A.e($.ciT().a6Z(d,A.C(y.N,y.z)),$async$Ay)
case 6:t=v.a=g
s=u.abk(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}x=10
return A.e(t.a5P(0,s[q],u),$async$Ay)
case 10:case 8:s.length===r||(0,A.Q)(s),++q
x=7
break
case 9:t.e=new B.b2U(v)
t.Q=new B.b2V(v)
t.d=new B.b2W(v)
return A.i(null,w)}})
return A.j($async$Ay,w)},
aOL(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sac8(0,d)
w.He()
x=w.r
if(x!=null)x.$0()}},
He(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o,n,m,l
var $async$He=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:n=t.z?0.8:1
m=t.c
m=m==null?null:m.Ow(0)
if(m==null)m=C.dl
q=m.length
p=0
case 2:if(!(p<m.length)){x=4
break}s=m[p]
v=6
x=9
return A.e(B.aVq(n,s),$async$He)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.M(l)
A.td().$1("Appel : volume distant impossible : "+A.u(r))
x=8
break
case 5:x=1
break
case 8:case 3:m.length===q||(0,A.Q)(m),++p
x=2
break
case 4:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$He,w)},
Lm(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Lm=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.o(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.VG(0),$async$Lm)
case 3:t=e
x=4
return A.e(s.GB(0,t),$async$Lm)
case 4:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Lm,w)},
E1(d){return this.bhw(d)},
bhw(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$E1=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.o(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.GD(0,new B.Ey(d.h(0,"sdp"),d.h(0,"type"))),$async$E1)
case 3:x=4
return A.e(s.VD(0),$async$E1)
case 4:t=f
x=5
return A.e(s.GB(0,t),$async$E1)
case 5:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$E1,w)},
V_(d){return this.bel(d)},
bel(d){var x=0,w=A.k(y.H),v=this,u
var $async$V_=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.o(A.am("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.GD(0,new B.Ey(d.h(0,"sdp"),d.h(0,"type"))),$async$V_)
case 2:return A.i(null,w)}})
return A.j($async$V_,w)},
UV(d){return this.be6(d)},
be6(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$UV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.UI(new B.KJ(A.an(d.h(0,"candidate")),A.an(d.h(0,"sdpMid")),A.dV(d.h(0,"sdpMLineIndex")))),$async$UV)
case 3:case 1:return A.i(v,w)}})
return A.j($async$UV,w)},
a_m(d){return this.azT(d)},
azT(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$a_m=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.Ow(0)
if(r==null)r=C.dl
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.Q)(r),++s)r[s].slV(0,t)
return A.i(null,w)}})
return A.j($async$a_m,w)},
GA(d){return this.azJ(d)},
azJ(d){var x=0,w=A.k(y.H),v=this
var $async$GA=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.z=d
x=2
return A.e(B.adz(d),$async$GA)
case 2:x=3
return A.e(v.He(),$async$GA)
case 3:return A.i(null,w)}})
return A.j($async$GA,w)},
a_j(d){return this.azz(d)},
azz(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$a_j=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.OJ(0)
if(s==null)s=C.dl
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.Q)(s),++t)s[t].slV(0,d)
return A.i(null,w)}})
return A.j($async$a_j,w)},
V6(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$V6=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.OJ(0)
if(s==null)s=D.am1
if(s.length===0){x=1
break}x=3
return A.e(B.cez(C.b.gU(s)),$async$V6)
case 3:case 1:return A.i(v,w)}})
return A.j($async$V6,w)},
hr(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$hr=A.f(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
x=7
return A.e(B.adz(!1),$async$hr)
case 7:u=2
x=6
break
case 4:u=3
i=t
x=6
break
case 3:x=2
break
case 6:u=9
p=s.a
p=p==null?null:p.a9(0)
x=12
return A.e(y.x.b(p)?p:A.dw(p,y.H),$async$hr)
case 12:u=2
x=11
break
case 9:u=8
h=t
x=11
break
case 8:x=2
break
case 11:s.a=null
p=s.b
p=p==null?null:p.abk(0)
if(p==null)p=C.dl
o=p.length
n=y.c
m=y._
l=0
case 13:if(!(l<p.length)){x=15
break}r=p[l]
u=17
k=J.cCx(r)
if(!m.b(k)){j=new A.aC($.aL,n)
j.a=8
j.c=k
k=j}x=20
return A.e(k,$async$hr)
case 20:u=2
x=19
break
case 17:u=16
g=t
x=19
break
case 16:x=2
break
case 19:case 14:p.length===o||(0,A.Q)(p),++l
x=13
break
case 15:s.b=null
u=22
x=25
return A.e(s.d.m(),$async$hr)
case 25:u=2
x=24
break
case 22:u=21
f=t
x=24
break
case 21:x=2
break
case 24:u=27
x=30
return A.e(s.e.m(),$async$hr)
case 30:u=2
x=29
break
case 27:u=26
e=t
x=29
break
case 26:x=2
break
case 29:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$hr,w)}}
B.a8O.prototype={
Vr(d){return this.bfM(d)},
bfM(d){var x=0,w=A.k(y.H),v=this
var $async$Vr=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.Hc(),$async$Vr)
case 2:return A.i(null,w)}})
return A.j($async$Vr,w)},
Hc(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Hc=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a8(r)===0){x=1
break}u=4
q=B.cCD(B.cdv(A.cI(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Hc)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cP(p,A.x(p).i("cP<1>")).b7(s.gb5l(),!0,s.gb3M(),new B.aDD(s))
u=2
x=6
break
case 4:u=3
n=t
s.a3M()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Hc,w)},
b5m(d){var x,w,v,u
try{x=C.a0.cX(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.r(J.m(x,"type"),"signal_appel"))return
w=J.m(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.cfQ(w))}catch(u){}},
a3M(){var x,w=this,v=w.c
if(v!=null)v.Y(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=D.ags[v]
w.f=v+1
v=w.d
if(v!=null)v.Y(0)
w.d=A.du(A.cY(0,0,0,0,x),new B.aDE(w))},
Lv(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$Lv=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.Y(0)
s=t.c
s=s==null?null:s.Y(0)
x=2
return A.e(y.x.b(s)?s:A.dw(s,y.H),$async$Lv)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.d()
q=q.a
q===$&&A.d()
r!==$&&A.b_()
r=s.w=new B.aum(s,q)}s=r.a9(0)}x=7
return A.e(y._.b(s)?s:A.dw(s,y.z),$async$Lv)
case 7:v=1
x=6
break
case 4:v=3
o=u
x=6
break
case 3:x=1
break
case 6:t.b=null
return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$Lv,w)}}
B.acI.prototype={
ud(d){return this.bnw(d)},
bnw(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$ud=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.e((r==null?t.a=A.Bk():r).aV(0),$async$ud)
case 6:x=7
return A.e(t.a.a_i(d),$async$ud)
case 7:x=8
return A.e(t.a.jl(C.JZ),$async$ud)
case 8:x=9
return A.e(t.a.il(1),$async$ud)
case 9:x=10
return A.e(t.a.cV(0),$async$ud)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.M(p)
A.td().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(s))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$ud,w)},
is(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$is=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.aV(0)
x=6
return A.e(y.x.b(s)?s:A.dw(s,y.H),$async$is)
case 6:v=1
x=5
break
case 3:v=2
q=u
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$is,w)},
hr(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$hr=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.m()
x=6
return A.e(y.x.b(s)?s:A.dw(s,y.H),$async$hr)
case 6:v=1
x=5
break
case 3:v=2
q=u
x=5
break
case 2:x=1
break
case 5:t.a=null
return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$hr,w)}}
B.aYB.prototype={
a6Z(d,e){return this.bhl(d,e)},
bhl(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a6Z=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a6(["mandatory",A.C(r,r),"optional",A.a([A.a6(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fT(u,y.N,y.z)
t.u(0,d)
s=new r(y.m.a(A.cd(t)))
t=J.l(s)
v=B.cK9(C.cj.gkr().bi(new A.eJ(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a6Z,w)}}
B.us.prototype={
Ow(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.da(w,A.Z(w).i("da<1,aE>"))
J.hv(w,new B.aTq(x))
return x},
OJ(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.da(w,A.Z(w).i("da<1,aE>"))
J.hv(w,new B.aTr(x))
return x},
abk(d){var x=A.H(this.Ow(0),!0,y.G)
C.b.u(x,this.OJ(0))
return x}}
B.adb.prototype={
aGV(d){var x=this,w=x.d
w.addEventListener("ended",A.c0(new B.aTn(x)))
w.addEventListener("mute",A.c0(new B.aTo(x)))
w.addEventListener("unmute",A.c0(new B.aTp(x)))},
slV(d,e){this.d.enabled=e},
V0(d,e){return this.beo(0,e)},
beo(d,e){var x=0,w=A.k(y.H),v=this
var $async$V0=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.eh(v.d.applyConstraints(y.m.a(A.cd(e))),y.X),$async$V0)
case 2:return A.i(null,w)}})
return A.j($async$V0,w)},
aV(d){var x=0,w=A.k(y.H),v=this
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aV,w)}}
B.aTa.prototype={
Gn(d,e){return this.ayF(0,e)},
ayF(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$Gn=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cX4())if(y.f.b(e.h(0,"video"))&&J.m(e.h(0,"video"),"facingMode")!=null)J.jg(e.h(0,"video"),"facingMode")
e.cS(0,"video",new B.aTc())
e.cS(0,"audio",new B.aTd())}catch(a0){A.oW("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hc(e.h(0,"audio"),i,i).aC(0,"optional")&&y.F.b(J.m(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.m(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.hv(s,new B.aTe(r))
J.jg(e.h(0,"audio"),"optional")
J.jG(e.h(0,"audio"),r)}}catch(a0){q=A.M(a0)
p=A.bo(a0)
A.oW("[getUserMedia] failed to translate optional audio constraints, "+A.u(q)+", "+A.u(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.cd(e)
x=10
return A.e(A.eh(o.getUserMedia(h.a(n)),h),$async$Gn)
case 10:m=a2
v=new B.us(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.eh(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$Gn)
case 11:l=a2
v=new B.us(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.M(f)
i=J.l(k)
throw A.o("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Gn,w)}}
B.af3.prototype={
aH3(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.c0(new B.aYD(x)))
w.addEventListener("icecandidate",A.c0(new B.aYE(x)))
w.addEventListener("iceconnectionstatechange",A.c0(new B.aYF(x)))
w.onicegatheringstatechange=A.c0(new B.aYG(x))
w.addEventListener("signalingstatechange",A.c0(new B.aYH(x)))
if(!$.ciE())w.addEventListener("connectionstatechange",A.c0(new B.aYI(x)))
w.addEventListener("negotiationneeded",A.c0(new B.aYJ(x)))
w.addEventListener("track",A.c0(new B.aYK(x)))},
VG(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$VG=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eh(s.createOffer(y.m.a(A.cd(A.C(y.N,y.z)))),y.A),$async$VG)
case 3:t=f
v=new B.Ey(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$VG,w)},
VD(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$VD=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eh(s.createAnswer(y.m.a(A.cd(A.C(y.N,y.z)))),y.A),$async$VD)
case 3:t=f
v=new B.Ey(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$VD,w)},
GB(d,e){return this.azN(0,e)},
azN(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$GB=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eh(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$GB)
case 2:return A.i(null,w)}})
return A.j($async$GB,w)},
GD(d,e){return this.aA2(0,e)},
aA2(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$GD=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eh(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$GD)
case 2:return A.i(null,w)}})
return A.j($async$GD,w)},
UI(d){return this.bdJ(d)},
bdJ(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$UI=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.eh(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$UI)
case 2:return A.i(null,w)}})
return A.j($async$UI,w)},
a9(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a9=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.d2(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a9,w)},
a5P(d,e,f){return this.be_(0,e,f)},
be_(d,e,f){var x=0,w=A.k(y.e),v,u=this,t
var $async$a5P=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.addTrack(e.d,f.e)
v=new B.af4()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a5P,w)}}
B.af4.prototype={}
B.cfD.prototype={
aV(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.M(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.o("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.i(null,w)}})
return A.j($async$aV,w)}}
B.Vc.prototype={
sauL(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.M9()
if(x!=null)x.style.objectFit=e},
aor(){var x=this,w=x.M9(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sn(0,v.art(u,x.z!=null,0,t))},
sac8(d,e){var x,w,v,u,t=this
t.z=e
if(e.OJ(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.as(y.l.b(x)?x:new A.da(x,A.Z(x).i("da<1,aE>")))
for(;x.B();){w=x.gJ(x)
t.x.addTrack(w)}}if(e.Ow(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.as(y.l.b(x)?x:new A.da(x,A.Z(x).i("da<1,aE>")))
for(;x.B();){w=x.gJ(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aQA()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.M9()
if(u!=null){u.srcObject=t.x
x=t.M9()
x.toString
t.ae0(x)}t.sn(0,t.a.bg9(t.z!=null))},
aQA(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
M9(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
m(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$m=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.Q)(t),++r)t[r].Y(0)
q=u.M9()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.eY()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$m,w)},
jA(d){var x=0,w=A.k(y.H),v=this
var $async$jA=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.GW()
$.qq().ut("RTCVideoRenderer-"+v.Q,new B.aYQ(v),!0)
return A.i(null,w)}})
return A.j($async$jA,w)},
ae0(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Ve.prototype={
P(){return new B.Vf()}}
B.Vf.prototype={
S(){var x,w,v=this
v.W()
v.a.c.aj(0,v.gb1w())
x=v.a
w=x.c
w.as=x.e
w.sauL(0,x.d===D.vi?"contain":"cover")},
b1x(){if(this.c!=null)this.k(new B.aYR())},
m(){if(this.c!=null)this.a3()},
aT(d){var x,w
this.bf(d)
A.du(A.cY(0,0,10,0,0),new B.aYT(this))
x=this.a
w=x.c
w.sauL(0,x.d===D.vi?"contain":"cover")},
D(d){return new A.iD(new B.aYS(this),null)}}
B.abk.prototype={
aGC(d,e,f,g){var x=this,w=$.aL
x.a!==$&&A.aK()
x.a=new B.a0y(d,x,new A.bf(new A.aC(w,y.c),y.r),e,g.i("a0y<0>"))
if(f.a.gjc())f.a=new B.WR(g.i("@<0>").cc(g).i("WR<1,2>")).hO(f.a)
w=A.h4(null,new B.aMd(f,x),null,!0,g)
x.b!==$&&A.aK()
x.b=w},
aky(){var x,w
this.d=!0
x=this.c
if(x!=null)x.Y(0)
w=this.b
w===$&&A.d()
w.a9(0)}}
B.a0y.prototype={
E(d,e){if(this.e)throw A.o(A.am("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
dA(d,e){if(this.e)throw A.o(A.am("Cannot add event after closing."))
if(this.d)return
this.aTv(d,e)},
i8(d){return this.dA(d,null)},
aTv(d,e){var x=this
if(x.w){x.a.a.dA(d,e)
return}x.c.hl(d,e)
x.akz()
x.b.aky()
x.a.a.a9(0).fJ(new B.bzT())},
a9(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.aky()
x.c.cH(0,x.a.a.a9(0))}return x.c.a},
akz(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dP(0)
return},
$ie6:1}
B.ahr.prototype={}
B.ahs.prototype={}
B.Br.prototype={
afu(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.HH(d,e))
x.a9(0)},
abC(d){var x
if((this.b.b&4)!==0)throw A.o(B.cgj())
x=A.cd(d)
x.toString
this.a.send(x)},
zf(d,e,f){return this.bfv(0,e,f)},
bfv(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$zf=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.o(B.cgj())
u.a9(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$zf,w)},
$icgi:1}
B.vp.prototype={}
B.M0.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.M0&&e.a===this.a},
gI(d){return C.d.gI(this.a)}}
B.Hf.prototype={
p(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.Hf&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gI(d){return A.hK(this.a)},
l(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.HH.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.HH&&e.a===this.a&&e.b===this.b},
gI(d){return A.hK([this.a,this.b])},
l(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.MB.prototype={
l(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibK:1}
B.MA.prototype={
l(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.axO.prototype={
aGk(d){d.ft(new B.axS(this),new B.axT(this),y.a)}}
B.aum.prototype={
a9(d){var x=this.b
x.e=x.d=null
return this.aBL(0)}}
B.aiO.prototype={
l(d){return"WebSocketChannelException: "+this.a},
$ibK:1}
B.z8.prototype={
O(){return"RTCSignalingState."+this.b}}
B.V8.prototype={
O(){return"RTCIceGatheringState."+this.b}}
B.z7.prototype={
O(){return"RTCPeerConnectionState."+this.b}}
B.om.prototype={
O(){return"RTCIceConnectionState."+this.b}}
B.af5.prototype={
O(){return"RTCVideoViewObjectFit."+this.b}}
B.aYA.prototype={}
B.TC.prototype={}
B.JT.prototype={
l(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aT9.prototype={}
B.KJ.prototype={}
B.V9.prototype={}
B.Va.prototype={}
B.aYL.prototype={}
B.Ey.prototype={}
B.Vb.prototype={}
B.Vd.prototype={
art(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Vd(x,w,v)},
bg9(d){return this.art(null,d,null,null)},
l(d){var x=this
return A.ae(x).l(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["au<~>()","~()","~(LC)","bz(KJ)","bz(Vb)","bz(om)","~(@)","us(@)","bz(cgi)","~(vp)"])
B.b3v.prototype={
$0(){return J.cBS(this.a.bm())},
$S:1}
B.b3w.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.M(v)
if(y.i.b(u)){x=u
w=A.bo(v)
this.b.dA(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.c9w.prototype={
$1(d){var x,w,v,u=$.Y().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.u(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.a0.e5(A.a6(["type","termine","contenu",A.C(v,y.z)],v,y.K),null),keepalive:!0})},
$S:26}
B.c9v.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.azT.prototype={
$1(d){if(d==null)return null
return A.bV(J.l(d))},
$S:100}
B.buO.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.JA(!0)},
$S:0}
B.buP.prototype={
$1(d){return this.a.Uv()},
$S:30}
B.buL.prototype={
$0(){var x=this.a.c
if(x!=null)A.a2(x,!1).bN()},
$S:0}
B.buM.prototype={
$0(){return this.a.e=!0},
$S:0}
B.buI.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.buJ.prototype={
$0(){return this.a.d=!1},
$S:0}
B.buK.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.buF.prototype={
$0(){return this.a.f=!0},
$S:0}
B.buG.prototype={
$0(){return this.a.f=!1},
$S:0}
B.buH.prototype={
$1(d){var x=null,w=this.a.a,v=w.c,u=w.e,t=w.d
return B.ce8(w.w,x,v,w.y,t,x,x,x,!1,u)},
$S:1204}
B.buN.prototype={
$0(){return this.a.b5D()},
$S:0}
B.buq.prototype={
$1(d){this.a.yc("candidat_ice",d,!1)},
$S:213}
B.bur.prototype={
$0(){var x=this.a
if(x.c!=null)x.k(new B.bup(x))},
$S:0}
B.bup.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bus.prototype={
$0(){this.a.mJ(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.but.prototype={
$0(){},
$S:0}
B.buu.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.k(new B.buo(x,w))},
$S:30}
B.buo.prototype={
$0(){return this.a.ch=new A.aw(Date.now(),0,!1).ev(this.b)},
$S:0}
B.buv.prototype={
$1(d){},
$S:142}
B.buw.prototype={
$1(d){this.a.ym()},
$S:30}
B.bu8.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.yc("annule",C.bn,!1)
x.mJ(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.bu9.prototype={
$0(){var x=this.a
x.fx=x.a.d==="video"?A.b("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.b("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.bua.prototype={
$1(d){this.a.yc("candidat_ice",d,!1)},
$S:213}
B.bub.prototype={
$0(){var x=this.a
if(x.c!=null)x.k(new B.bu7(x))},
$S:0}
B.bu7.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.buc.prototype={
$0(){this.a.mJ(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bud.prototype={
$0(){return this.a.z=!0},
$S:0}
B.bue.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.k(new B.bu6(x,w))},
$S:30}
B.bu6.prototype={
$0(){return this.a.ch=new A.aw(Date.now(),0,!1).ev(this.b)},
$S:0}
B.buf.prototype={
$1(d){},
$S:142}
B.bug.prototype={
$1(d){this.a.ym()},
$S:30}
B.buy.prototype={
$1(d){var x=this.a
if(x.c==null||x.y)return
x.T6()
x.ah_("reponse",d)},
$S:409}
B.buz.prototype={
$1(d){this.a.mJ(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buA.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.T6()},
$S:32}
B.buB.prototype={
$1(d){this.a.mJ(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buC.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.ah_("offre",d)},
$S:409}
B.buD.prototype={
$1(d){this.a.mJ(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.bul.prototype={
$0(){var x=this.a
x.x=!0
x.ay=new A.aw(Date.now(),0,!1)
x.ch=C.R},
$S:0}
B.bum.prototype={
$0(){return this.a.go=!0},
$S:0}
B.bun.prototype={
$1(d){var x=this.a.c
if(x!=null)A.a2(x,!1).bN()},
$S:5}
B.bux.prototype={
$1(d){return A.C(y.N,y.z)},
$S:104}
B.bu5.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bu4.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.bu3.prototype={
$0(){return this.a.ax=this.b},
$S:0}
B.bui.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a2(w,!1).bN()
x.Q8()},
$S:0}
B.buj.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a2(w,!1).XV().aL(new B.buh(x),y.H)},
$S:0}
B.buh.prototype={
$1(d){return this.a.alD()},
$S:9}
B.buk.prototype={
$1(d){return A.ft(!0,A.I(this.a,C.n,C.f,C.N),!0,C.Z,!0,!0)},
$S:135}
B.buE.prototype={
$2(d,e){if(!d)this.a.Ju()},
$S:1208}
B.bQs.prototype={
$2(d,e){var x,w,v,u=null,t=this.a,s=t.d
s===$&&A.d()
s=s.x
s===$&&A.d()
t=t.a.e
x=t?0.07:0.04
t=t?0.55:0.35
w=this.b
v=w+20
s=A.cqA(A.R(u,u,C.j,u,u,new A.a4(u,u,A.bk(C.t.b5(t*(1-s)),3),u,u,u,C.aI),u,v,u,u,u,u,u,v),1+x*s)
w+=8
w=A.R(u,u,C.j,u,u,new A.a4(u,u,A.bk(C.t,2),u,u,u,C.aI),u,w,u,u,u,u,u,w)
e.toString
return A.e1(C.a5,A.a([s,w,e],y.p),C.h,C.aH,u)},
$S:1209}
B.b2U.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a6(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.b2V.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gU(x):null
if(w!=null)this.a.aOL(w)},
$S:z+4}
B.b2W.prototype={
$1(d){var x
if(d===D.OW){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aDD.prototype={
$1(d){return this.a.a3M()},
$S:22}
B.aDE.prototype={
$0(){var x=this.a
if(!x.e)x.Hc()},
$S:0}
B.caz.prototype={
$1(d){return d.length!==0},
$S:8}
B.aTq.prototype={
$1(d){return this.a.push(B.ceY(d))},
$S:22}
B.aTr.prototype={
$1(d){return this.a.push(B.ceY(d))},
$S:22}
B.aTn.prototype={
$1(d){},
$S:24}
B.aTo.prototype={
$1(d){},
$S:24}
B.aTp.prototype={
$1(d){},
$S:24}
B.aTc.prototype={
$0(){return!1},
$S:57}
B.aTd.prototype={
$0(){return!1},
$S:57}
B.aTe.prototype={
$1(d){J.hv(d,new B.aTb(this.a))},
$S:213}
B.aTb.prototype={
$2(d,e){this.a.j(0,d,e)},
$S:52}
B.aYD.prototype={
$1(d){},
$S:24}
B.aYE.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.KJ(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:24}
B.aYF.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cWD(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.ciE())switch(w.cx.a){case 0:w.cy=D.P0
break
case 1:w.cy=D.P1
break
case 3:w.cy=D.P2
break
case 5:w.cy=D.OZ
break
case 6:w.cy=D.P_
break
case 7:w.cy=D.vh
break
default:break}},
$S:36}
B.aYG.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cWE(w.iceGatheringState)},
$S:36}
B.aYH.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cYQ(w.signalingState)},
$S:36}
B.aYI.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cXZ(w.connectionState)},
$S:36}
B.aYJ.prototype={
$1(d){},
$S:36}
B.aYK.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.ceY(d.track)
x=d.streams
x=y.l.b(x)?x:new A.da(x,A.Z(x).i("da<1,aE>"))
w=J.dr(x,new B.aYC(w),y.h)
v.$1(new B.Vb(A.H(w,!0,w.$ti.i("aD.E"))))}},
$S:24}
B.aYC.prototype={
$1(d){return new B.us(d,this.a.as)},
$S:z+7}
B.caI.prototype={
$1(d){return J.h9(self.window.navigator.userAgent,A.bE(d,!1,!1))},
$S:8}
B.aYQ.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.Q)(w),++u)w[u].Y(0)
C.b.a1(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.ae0(t)
v=y.k.c
w.push(A.iL(t,"canplay",new B.aYM(x),!1,v))
w.push(A.iL(t,"resize",new B.aYN(x),!1,v))
w.push(A.iL(t,"error",new B.aYO(t),!1,v))
w.push(A.iL(t,"ended",new B.aYP(),!1,v))
return t},
$S:185}
B.aYM.prototype={
$1(d){this.a.aor()},
$S:22}
B.aYN.prototype={
$1(d){this.a.aor()},
$S:22}
B.aYO.prototype={
$1(d){var x,w,v=this.a.error
A.oW("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.K4.h(0,A.ax(v,"code"))
x.toString
w=!J.r(A.ax(v,"message"),"")?A.ax(v,"message"):"No further diagnostic information can be determined or provided."
throw A.o(A.og(x,C.K3.h(0,A.ax(v,"code")),w,null))},
$S:26}
B.aYP.prototype={
$1(d){},
$S:22}
B.aYR.prototype={
$0(){},
$S:0}
B.aYT.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aYS.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.abB("RTCVideoRenderer-"+w.Q)
else w=A.R(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cz(A.R(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:1210}
B.aMd.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.fM(w.giq(w),new B.aMc(v),w.gpB())},
$S:0}
B.aMc.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.akz()
x=x.b
x===$&&A.d()
x.a9(0)},
$S:0}
B.bzT.prototype={
$1(d){},
$S:17}
B.aC9.prototype={
$1(d){this.a.cH(0,this.b)},
$S:24}
B.aCa.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hB(new B.MB("Failed to connect WebSocket"))
else this.b.afu(1006,"error")},
$S:24}
B.aCb.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cE("data")
if(typeof x==="string")w.b=new B.M0(A.bx(x))
else if(typeof x==="object"&&A.cnC(y.m.a(x),"ArrayBuffer"))w.b=new B.Hf(A.U3(y.o.a(x),0,null))
else throw A.o(A.am("unexpected message type: "+J.aI(x).l(0)))
v.E(0,w.bm())},
$S:26}
B.aCc.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cH(0,this.b)
this.b.afu(d.code,d.reason)},
$S:24}
B.axS.prototype={
$1(d){var x=d.b,w=this.a
new A.cP(x,A.x(x).i("cP<1>")).cP(new B.axP(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cP(x,A.x(x).i("cP<1>")).bnM(new B.axQ(d),new B.axR(w,d))
w.f.dP(0)},
$S:z+8}
B.axP.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.M0
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,w)
break $label0$0}x=d instanceof B.Hf
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,v)
break $label0$0}if(d instanceof B.HH){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a9(0)}}},
$S:z+9}
B.axQ.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ap(B.cgj())
s=A.cd(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.abC(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.abC(new Uint8Array(A.c2(u)))
break $label1$1}t=A.aV("Cannot send "+J.aI(d).l(0))
throw A.o(t)}}catch(r){if(!(A.M(r) instanceof B.MA))throw r}},
$S:18}
B.axR.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.zf(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.M(q) instanceof B.MA))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.axT.prototype={
$1(d){var x,w=d instanceof A.XT?d:new B.aiO(J.l(d)),v=this.a
v.f.hB(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.i8(w)
v=v.a
v===$&&A.d()
v.a9(0)},
$S:36};(function aliases(){var x=B.Ih.prototype
x.aBL=x.a9
x=B.a5P.prototype
x.aFA=x.m})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.a_F.prototype,"gaHN","H_",0)
var v
w(v=B.a_E.prototype,"gaoj","aok",2)
x(v,"galf","Ju",0)
x(v,"galC","alD",1)
x(v,"gaee","Qb",0)
x(v,"gaed","Qa",0)
x(v,"gaec","Q7",0)
x(v,"gapn","bd1",1)
x(v,"gakI","b2o",1)
w(v=B.a8O.prototype,"gb5l","b5m",6)
x(v,"gb3M","a3M",1)
x(B.Vc.prototype,"gec","m",0)
x(B.Vf.prototype,"gb1w","b1x",1)})();(function inheritance(){var x=a.mixinHard,w=a.inheritMany,v=a.inherit
w(A.ac,[B.Ih,B.azS,B.LC,B.a91,B.b2T,B.a8O,B.acI,B.aYA,B.TC,B.JT,B.aT9,B.V9,B.Va,B.aYL,B.ahs,B.a0y,B.ahr,B.Br,B.vp,B.MB,B.aiO,B.KJ,B.Ey,B.Vb,B.Vd])
v(B.WR,A.h5)
w(A.kn,[B.b3v,B.c9v,B.buO,B.buL,B.buM,B.buI,B.buJ,B.buK,B.buF,B.buG,B.buN,B.bur,B.bup,B.bus,B.but,B.buo,B.bu8,B.bu9,B.bub,B.bu7,B.buc,B.bud,B.bu6,B.bul,B.bum,B.bu5,B.bu4,B.bu3,B.bui,B.buj,B.aDE,B.aTc,B.aTd,B.aYR,B.aYT,B.aMd,B.aMc,B.axR])
w(A.jN,[B.b3w,B.c9w,B.azT,B.buP,B.buH,B.buq,B.buu,B.buv,B.buw,B.bua,B.bue,B.buf,B.bug,B.buy,B.buz,B.buA,B.buB,B.buC,B.buD,B.bun,B.bux,B.buh,B.buk,B.b2U,B.b2V,B.b2W,B.aDD,B.caz,B.aTq,B.aTr,B.aTn,B.aTo,B.aTp,B.aTe,B.aYD,B.aYE,B.aYF,B.aYG,B.aYH,B.aYI,B.aYJ,B.aYK,B.aYC,B.caI,B.aYQ,B.aYM,B.aYN,B.aYO,B.aYP,B.bzT,B.aC9,B.aCa,B.aCb,B.aCc,B.axS,B.axP,B.axQ,B.axT])
w(A.S,[B.qR,B.qQ,B.NP,B.Ve])
w(A.X,[B.a_F,B.a_E,B.a5P,B.Vf])
w(A.av,[B.Z6,B.aku,B.Z7,B.A4])
w(A.tC,[B.buE,B.bQs,B.aTb,B.aYS])
v(B.ap7,B.a5P)
v(B.aYB,B.aYA)
v(B.us,B.TC)
v(B.adb,B.JT)
v(B.aTa,B.aT9)
v(B.af3,B.V9)
v(B.af4,B.Va)
v(B.cfD,B.aYL)
v(B.Vc,A.dv)
w(B.ahs,[B.abk,B.axO])
w(B.vp,[B.M0,B.Hf,B.HH])
v(B.MA,B.MB)
v(B.aum,B.Ih)
w(A.N7,[B.z8,B.V8,B.z7,B.om,B.af5])
x(B.a5P,A.h3)})()
A.oO(b.typeUniverse,JSON.parse('{"Ih":{"e6":["1"]},"WR":{"h5":["1","2"],"h5.S":"1","h5.T":"2"},"NP":{"S":[],"q":[]},"qR":{"S":[],"q":[]},"a_F":{"X":["qR"]},"Z6":{"av":[],"q":[]},"qQ":{"S":[],"q":[]},"a_E":{"X":["qQ"]},"aku":{"av":[],"q":[]},"Z7":{"av":[],"q":[]},"A4":{"av":[],"q":[]},"ap7":{"X":["NP"]},"us":{"TC":[]},"adb":{"JT":[]},"af3":{"V9":[]},"af4":{"Va":[]},"Vc":{"dv":["Vd"],"b1":[]},"Ve":{"S":[],"q":[]},"Vf":{"X":["Ve"]},"a0y":{"e6":["1"]},"Br":{"cgi":[]},"M0":{"vp":[]},"Hf":{"vp":[]},"HH":{"vp":[]},"MB":{"bK":[]},"MA":{"bK":[]},"aum":{"e6":["@"]},"aiO":{"bK":[]}}'))
A.crZ(b.typeUniverse,JSON.parse('{"Ih":1,"ahs":1}'))
var y=(function rtii(){var x=A.aA
return{b:x("Br"),L:x("bK"),_:x("au<@>"),x:x("au<~>"),S:x("G<ag<p,U>>"),t:x("G<ag<p,@>>"),Q:x("G<JT>"),d:x("G<ju<@>>"),s:x("G<p>"),p:x("G<q>"),m:x("aE"),l:x("F<aE>"),F:x("F<ag<p,@>>"),j:x("F<@>"),I:x("F<v>"),P:x("ag<p,@>"),f:x("ag<@,@>"),E:x("TC"),G:x("JT"),h:x("us"),o:x("ra"),a:x("bz"),K:x("ac"),J:x("V9"),e:x("Va"),v:x("Ey"),Z:x("ahr<ac?>"),N:x("p"),i:x("rK"),M:x("e3"),D:x("vp"),U:x("V<p>"),g:x("dT<LC>"),n:x("dT<~>"),V:x("bf<Br>"),r:x("bf<@>"),R:x("bf<~>"),k:x("a_P<aE>"),C:x("qa<aE>"),u:x("aC<Br>"),c:x("aC<@>"),W:x("aC<~>"),q:x("kO"),y:x("U"),z:x("@"),A:x("aE?"),X:x("ac?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.zJ=new A.a_(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.w)
D.ZI=new B.a91(C.h8)
D.rQ=new A.al(32,0,32,0)
D.a3l=new A.al(8,20,8,20)
D.a3D=new A.cR(1,C.ar,C.w8,null)
D.BJ=new A.ao(57639,"MaterialIcons",null,!1)
D.a4M=new A.ao(58337,"MaterialIcons",null,!1)
D.a4N=new A.ao(58341,"MaterialIcons",null,!1)
D.BT=new A.ao(59048,"MaterialIcons",null,!1)
D.a4R=new A.ao(59049,"MaterialIcons",null,!1)
D.a4S=new A.ao(59077,"MaterialIcons",null,!1)
D.BO=new A.ao(58195,"MaterialIcons",null,!1)
D.a6R=new A.aa(D.BO,null,C.m,null,null)
D.a6Q=new A.aa(D.BO,28,C.m,null,null)
D.a4Q=new A.ao(58923,"MaterialIcons",null,!1)
D.a76=new A.aa(D.a4Q,null,C.m,null,null)
D.ags=A.a(x([1,2,4,8,16]),A.aA("G<v>"))
D.am1=A.a(x([]),y.Q)
D.Kj=new A.h2("FlutterWebRTC.Method",C.bk,null)
D.aw_=new B.om(0,"RTCIceConnectionStateNew")
D.aw0=new B.om(1,"RTCIceConnectionStateChecking")
D.aw1=new B.om(2,"RTCIceConnectionStateCompleted")
D.aw2=new B.om(3,"RTCIceConnectionStateConnected")
D.aw3=new B.om(4,"RTCIceConnectionStateCount")
D.OW=new B.om(5,"RTCIceConnectionStateFailed")
D.aw4=new B.om(6,"RTCIceConnectionStateDisconnected")
D.OX=new B.om(7,"RTCIceConnectionStateClosed")
D.OY=new B.V8(0,"RTCIceGatheringStateNew")
D.aw5=new B.V8(1,"RTCIceGatheringStateGathering")
D.aw6=new B.V8(2,"RTCIceGatheringStateComplete")
D.vh=new B.z7(0,"RTCPeerConnectionStateClosed")
D.OZ=new B.z7(1,"RTCPeerConnectionStateFailed")
D.P_=new B.z7(2,"RTCPeerConnectionStateDisconnected")
D.P0=new B.z7(3,"RTCPeerConnectionStateNew")
D.P1=new B.z7(4,"RTCPeerConnectionStateConnecting")
D.P2=new B.z7(5,"RTCPeerConnectionStateConnected")
D.aw7=new B.z8(0,"RTCSignalingStateStable")
D.aw8=new B.z8(1,"RTCSignalingStateHaveLocalOffer")
D.aw9=new B.z8(2,"RTCSignalingStateHaveRemoteOffer")
D.awa=new B.z8(3,"RTCSignalingStateHaveLocalPrAnswer")
D.awb=new B.z8(4,"RTCSignalingStateHaveRemotePrAnswer")
D.P3=new B.z8(5,"RTCSignalingStateClosed")
D.awc=new B.Vd(0,0,0)
D.vi=new B.af5(0,"RTCVideoViewObjectFitContain")
D.P4=new B.af5(1,"RTCVideoViewObjectFitCover")
D.azW=new A.cj(48,null,null,null)
D.aA8=new A.cj(null,64,null,null)
D.aD7=new A.D(!0,C.m,null,null,null,null,26,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aDl=new A.D(!0,C.o,null,null,null,null,40,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.wA=new A.D(!0,C.am,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.chi=null
$.cr0=!1
$.cp7=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"d3P","ciT",()=>new B.aYB())
x($,"d0r","ciE",()=>C.d.q(A.ax(A.ax(A.ax(A.cii(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"wuyC2wwU2jWAFCLt2sYOTbqoo+M=");