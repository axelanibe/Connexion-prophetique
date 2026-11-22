((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_1",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,C,B={Ih:function Ih(){},WR:function WR(d){this.$ti=d},b3E:function b3E(d){this.a=d},b3F:function b3F(d,e){this.a=d
this.b=e},
cuE(d){var x
B.c7X()
if(d.length===0)return
x=A.c_(new B.c9F(d))
self.window.addEventListener("beforeunload",x)
$.chs=new B.c9E(x)},
c7X(){var x=$.chs
if(x!=null)x.$0()
$.chs=null},
c9F:function c9F(d){this.a=d},
c9E:function c9E(d){this.a=d},
a7q(d){var x,w,v,u,t=new B.aA2(),s=J.M(d),r=s.h(d,"id")
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
return new B.aA1(r,x,w,v,u)},
cg_(d){var x,w,v,u=J.M(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.mL(t,y.N,y.z):C.bn
if(u.h(d,"cree_le")!=null)A.bQ(J.l(u.h(d,"cree_le")))
return new B.LC(s,x,w,v)},
cEb(d){var x,w,v,u,t,s,r=J.M(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return D.ZH
x=A.a([],y.t)
for(r=J.ar(q),w=y.f,v=y.P,u=y.N,t=y.z;r.B();){s=r.gI(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.mL(s,u,t))}return new B.a92(x)},
cvt(d){var x=J.M(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.oX(v)
if(!x.p(v,"offer")&&!x.p(v,"answer"))return null
return new A.aqk(w,v)},
cUP(d){var x,w,v=J.M(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.aqn(u,A.i4(w)?w:null,v)},
aA1:function aA1(d,e,f,g,h){var _=this
_.a=d
_.c=e
_.d=f
_.r=g
_.w=h},
aA2:function aA2(){},
LC:function LC(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a92:function a92(d){this.a=d},
cmy(d,e,f,g,h,i,j){return new B.qR(f,g,j,i,e,d,null)},
cei(d,e,f,g,h,i,j,k,l,m){return new B.qQ(f,m,h,l,i,d,j,k,e,g,null)},
cro(d,e,f,g,h,i,j,k,l,m,n){return new B.akv(e,g,f,d,n,j,i,h,m,k,l,null)},
ctp(d,e){var x=null
return new A.Z(D.rO,A.c(d.toUpperCase(),2,C.a4,x,x,A.c8(x,x,C.m,x,x,x,x,x,"Cinzel",x,x,e,x,x,C.A,x,x,!0,x,1.2,x,x,x,x,x,x),C.X,x,x),x)},
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
buX:function buX(d){this.a=d},
buY:function buY(d){this.a=d},
buU:function buU(d){this.a=d},
buV:function buV(d){this.a=d},
buR:function buR(d){this.a=d},
buS:function buS(d){this.a=d},
buT:function buT(d){this.a=d},
buO:function buO(d){this.a=d},
buP:function buP(d){this.a=d},
buQ:function buQ(d){this.a=d},
buW:function buW(d){this.a=d},
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
buz:function buz(d){this.a=d},
buA:function buA(d){this.a=d},
buy:function buy(d){this.a=d},
buB:function buB(d){this.a=d},
buC:function buC(){},
buD:function buD(d){this.a=d},
bux:function bux(d,e){this.a=d
this.b=e},
buE:function buE(){},
buF:function buF(d){this.a=d},
buh:function buh(d){this.a=d},
bui:function bui(d){this.a=d},
buj:function buj(d){this.a=d},
buk:function buk(d){this.a=d},
bug:function bug(d){this.a=d},
bul:function bul(d){this.a=d},
bum:function bum(d){this.a=d},
bun:function bun(d){this.a=d},
buf:function buf(d,e){this.a=d
this.b=e},
buo:function buo(){},
bup:function bup(d){this.a=d},
buH:function buH(d){this.a=d},
buI:function buI(d){this.a=d},
buJ:function buJ(d){this.a=d},
buK:function buK(d){this.a=d},
buL:function buL(d){this.a=d},
buM:function buM(d){this.a=d},
buu:function buu(d,e){this.a=d
this.b=e},
buv:function buv(d){this.a=d},
buw:function buw(d){this.a=d},
buG:function buG(){},
bue:function bue(d,e){this.a=d
this.b=e},
bud:function bud(d,e){this.a=d
this.b=e},
buc:function buc(d,e){this.a=d
this.b=e},
bur:function bur(d){this.a=d},
bus:function bus(d){this.a=d},
buq:function buq(d){this.a=d},
but:function but(d){this.a=d},
buN:function buN(d){this.a=d},
akv:function akv(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
ap8:function ap8(d,e){var _=this
_.d=$
_.eG$=d
_.bR$=e
_.c=_.a=null},
bQB:function bQB(d,e){this.a=d
this.b=e},
a5P:function a5P(){},
b31:function b31(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.z=_.y=_.x=!1},
b32:function b32(d){this.a=d},
b33:function b33(d){this.a=d},
b34:function b34(d){this.a=d},
a8P:function a8P(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aDM:function aDM(d){this.a=d},
aDN:function aDN(d){this.a=d},
caH(d){var x=y.U,w=A.G(new A.X(A.a(d.split(" "),y.s),new B.caI(),x),!0,x.i("w.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.m(C.b.gU(w),0).toUpperCase()
return(J.m(C.b.gU(w),0)+J.m(C.b.gaX(w),0)).toUpperCase()},
caI:function caI(){},
acJ:function acJ(){this.a=null},
aYK:function aYK(){},
us:function us(d,e){this.e=d
this.b=e},
aTz:function aTz(d){this.a=d},
aTA:function aTA(d){this.a=d},
cf7(d){var x=new B.adc(d)
x.aGM(d)
return x},
adc:function adc(d){this.d=d},
aTw:function aTw(d){this.a=d},
aTx:function aTx(d){this.a=d},
aTy:function aTy(d){this.a=d},
aTj:function aTj(){},
aTl:function aTl(){},
aTm:function aTm(){},
aTn:function aTn(d){this.a=d},
aTk:function aTk(d){this.a=d},
cKi(d,e){var x=y.N
x=new B.af4(d,e,A.C(x,y.E),A.C(x,y.z))
x.aGV(d,e)
return x},
af4:function af4(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aYM:function aYM(d){this.a=d},
aYN:function aYN(d){this.a=d},
aYO:function aYO(d){this.a=d},
aYP:function aYP(d){this.a=d},
aYQ:function aYQ(d){this.a=d},
aYR:function aYR(d){this.a=d},
aYS:function aYS(d){this.a=d},
aYT:function aYT(d){this.a=d},
aYL:function aYL(d){this.a=d},
af5:function af5(){},
cfN:function cfN(d){this.a=d},
cXd(){return C.b.nL(A.a(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.caR())!==-1},
caR:function caR(){},
cpf(){var x=A.a([],y.d),w=$.cpg
$.cpg=w+1
return new B.Vc(w,x,D.awb,$.ah())},
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
aYZ:function aYZ(d){this.a=d},
aYV:function aYV(d){this.a=d},
aYW:function aYW(d){this.a=d},
aYX:function aYX(d){this.a=d},
aYY:function aYY(){},
cfO(d,e,f){return new B.Ve(d,f,e,null)},
Ve:function Ve(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
Vf:function Vf(){this.c=this.a=null},
aZ_:function aZ_(){},
aZ1:function aZ1(d){this.a=d},
aZ0:function aZ0(d){this.a=d},
cnc(d,e,f,g){var x,w={}
w.a=d
x=new B.abl(g.i("abl<0>"))
x.aGt(e,f,w,g)
return x},
abl:function abl(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
aMm:function aMm(d,e){this.a=d
this.b=e},
aMl:function aMl(d){this.a=d},
a0y:function a0y(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bA1:function bA1(){},
ahs:function ahs(d){this.b=this.a=$
this.$ti=d},
aht:function aht(){},
cdF(d,e){return B.cDk(d,e)},
cDk(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$cdF=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.pV("ws")&&!d.pV("wss"))throw A.o(A.fO(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.l(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.Br(r,A.h5(null,null,null,!1,y.D))
u=new A.aC($.aL,y.u)
p=new A.bf(u,y.V)
if(J.r(r.readyState,1))p.cI(0,q)
else if(J.r(r.readyState,2)||J.r(r.readyState,3))p.hB(new B.MB("Unexpected WebSocket state: "+A.u(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.qb(r,"open",!1,y.C).gU(0).aK(new B.aCj(p,q),y.H)
t=y.C
s=y.H
new A.qb(r,"error",!1,t).gU(0).aK(new B.aCk(p,q),s)
A.iN(r,"message",new B.aCl(q),!1,y.m)
new A.qb(r,"close",!1,t).gU(0).aK(new B.aCm(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$cdF,w)},
Br:function Br(d,e){this.a=d
this.b=e},
aCj:function aCj(d,e){this.a=d
this.b=e},
aCk:function aCk(d,e){this.a=d
this.b=e},
aCl:function aCl(d){this.a=d},
aCm:function aCm(d,e){this.a=d
this.b=e},
cgt(){return new B.MA("Connection Closed")},
vp:function vp(){},
M0:function M0(d){this.a=d},
Hf:function Hf(d){this.a=d},
HH:function HH(d,e){this.a=d
this.b=e},
MB:function MB(d){this.a=d},
MA:function MA(d){this.a=d},
cCM(d){var x=null,w=$.aL,v=new B.ahs(y.Z),u=y.X,t=A.h5(x,x,x,!0,u),s=A.h5(x,x,x,!0,u),r=A.x(s),q=A.x(t)
v.a=B.cnc(new A.cP(s,r.i("cP<1>")),new A.Gr(t,q.i("Gr<1>")),!0,u)
v.b=B.cnc(new A.cP(t,q.i("cP<1>")),new A.Gr(s,r.i("Gr<1>")),!1,u)
v=new B.axP(new A.bf(new A.aC(w,y.W),y.R),v)
v.aGb(d)
return v},
axP:function axP(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
axT:function axT(d){this.a=d},
axQ:function axQ(d){this.a=d},
axR:function axR(d){this.a=d},
axS:function axS(d,e){this.a=d
this.b=e},
axU:function axU(d){this.a=d},
aun:function aun(d,e){this.b=d
this.a=e},
aiP:function aiP(d){this.a=d},
cWM(d){switch(d){case"new":return D.avZ
case"checking":return D.aw_
case"connected":return D.aw1
case"completed":return D.aw0
case"failed":return D.OU
case"disconnected":return D.aw3
case"closed":return D.OV
case"count":return D.aw2}return D.OV},
cWN(d){switch(d){case"new":return D.OW
case"gathering":return D.aw4
case"complete":return D.aw5}return D.OW},
cYZ(d){switch(d){case"stable":return D.aw6
case"have-local-offer":return D.aw7
case"have-local-pranswer":return D.aw9
case"have-remote-offer":return D.aw8
case"have-remote-pranswer":return D.awa
case"closed":return D.P1}return D.P1},
cY7(d){switch(d){case"new":return D.OZ
case"connecting":return D.P_
case"connected":return D.P0
case"closed":return D.vf
case"disconnected":return D.OY
case"failed":return D.OX}return D.vf},
z8:function z8(d,e){this.a=d
this.b=e},
V8:function V8(d,e){this.a=d
this.b=e},
z7:function z7(d,e){this.a=d
this.b=e},
oo:function oo(d,e){this.a=d
this.b=e},
af6:function af6(d,e){this.a=d
this.b=e},
aYJ:function aYJ(){},
TC:function TC(){},
JT:function JT(){},
aTi:function aTi(){},
KJ:function KJ(d,e,f){this.a=d
this.b=e
this.c=f},
V9:function V9(){},
Va:function Va(){},
aYU:function aYU(){},
Ey:function Ey(d,e){this.a=d
this.b=e},
Vb:function Vb(d){this.b=d},
Vd:function Vd(d,e,f){this.a=d
this.b=e
this.c=f},
ceJ(d){var x=0,w=A.k(y.y)
var $async$ceJ=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.o("The is not a video track => "+d.l(0))
throw A.o("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$ceJ,w)},
adA(d){var x=0,w=A.k(y.H),v
var $async$adA=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.b8A("enableSpeakerphone",A.a6(["enable",d],y.N,v),v,v),$async$adA)
case 2:return A.i(null,w)}})
return A.j($async$adA,w)},
aVz(d,e){var x=0,w=A.k(y.H),v,u,t
var $async$aVz=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:t=e.d
x=t.kind==="audio"?3:4
break
case 3:u=J.mL(y.f.a(A.c9p(t.getConstraints())),y.N,y.z)
u.j(0,"volume",d)
x=5
return A.e(e.US(0,u),$async$aVz)
case 5:case 4:v=A.d2(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aVz,w)},
b8A(d,e,f,g){return B.cNT(d,e,f,g,f.i("0?"))},
cNT(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$b8A=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:x=3
return A.e(B.b8z(),$async$b8A)
case 3:v=D.Kh.cl(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$b8A,w)},
b8z(){var x=0,w=A.k(y.H),v,u
var $async$b8z=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:x=!$.cr9?2:3
break
case 2:v=y.N
u=y.z
x=4
return A.e(D.Kh.cl("initialize",A.a6(["options",A.C(v,u)],v,u),!1,y.H),$async$b8z)
case 4:$.cr9=!0
case 3:return A.i(null,w)}})
return A.j($async$b8z,w)}},D
J=c[1]
A=c[0]
C=c[2]
B=a.updateHolder(c[3],B)
D=c[26]
B.Ih.prototype={
F(d,e){this.a.F(0,e)},
dB(d,e){this.a.dB(d,e)},
aa(d){return this.a.aa(0)},
$ie7:1}
B.WR.prototype={
hM(d){var x=A.cE("subscription"),w=A.h5(new B.b3E(x),null,null,!0,this.$ti.y[1])
x.b=d.fM(new B.b3F(this,w),w.gnD(w),w.gpt())
return new A.cP(w,A.x(w).i("cP<1>"))}}
B.aA1.prototype={}
B.LC.prototype={}
B.a92.prototype={}
B.qR.prototype={
P(){return new B.a_F()}}
B.a_F.prototype={
S(){var x,w,v=this
v.V()
x=v.a
x.toString
v.z=!0
w=new B.acJ()
v.y!==$&&A.aK()
v.y=w
if(!x.y)w.u3(A.BE(C.lk,$.w0().a).c)
v.PS()
v.r=A.du(C.c9,new B.buX(v))
v.w=A.hq(C.rD,new B.buY(v))},
m(){var x=this,w=x.r
if(w!=null)w.X(0)
w=x.w
if(w!=null)w.X(0)
w=x.x
if(w!=null)w.X(0)
w=x.y
w===$&&A.d()
w.ip()
if(x.z)w.hr()
x.a3()},
a3O(){var x=this.x
if(x!=null)x.X(0)
this.x=A.du(C.fW,new B.buU(this))},
Um(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Um=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.K()
x=7
return A.e(o.En(p.c),$async$Um)
case 7:r=e
q=B.a7q(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.k(new B.buV(s))
p=s.r
if(p!=null)p.X(0)
p=s.w
if(p!=null)p.X(0)
p=s.y
p===$&&A.d()
p.ip()
s.a3O()}u=2
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
return A.j($async$Um,w)},
PS(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$PS=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.K()
x=7
return A.e(n.En(o.c),$async$PS)
case 7:r=e
q=B.a7q(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null){o=$.K()
m=o.gwL()}p=m
if(q.w!=="sonne"||q.c===p){s.k(new B.buR(s))
o=s.y
o===$&&A.d()
o.ip()
s.a3O()
x=1
break}s.k(new B.buS(s))
if(s.a.y)s.GQ()
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.k(new B.buT(s))
o=s.y
o===$&&A.d()
o.ip()
s.a3O()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$PS,w)},
GQ(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$GQ=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.Q=!0
s.k(new B.buO(s))
u=4
q=s.a
q.toString
p=$.K()
x=7
return A.e(p.LG(q.c,"accepte"),$async$GQ)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.N(n)
if(s.c==null){x=1
break}s.k(new B.buP(s))
q=s.c
q.toString
p=J.l(r)
q.q(y.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(p,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
x=1
break
x=6
break
case 3:x=2
break
case 6:if(s.c==null){x=1
break}q=s.r
if(q!=null)q.X(0)
q=s.w
if(q!=null)q.X(0)
q=s.y
q===$&&A.d()
q.ip()
q=s.c
q.toString
A.a2(q,!1).Ap(A.eg(new B.buQ(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$GQ,w)},
Jq(d){return this.b5y(d)},
b5x(){return this.Jq(!1)},
b5y(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Jq=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.X(0)
r=s.w
if(r!=null)r.X(0)
r=s.y
r===$&&A.d()
r.ip()
u=4
r=s.a
r.toString
q=$.K()
x=7
return A.e(q.LG(r.c,"refuse"),$async$Jq)
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
return A.j($async$Jq,w)},
D(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.jO(C.t,s,A.c(B.caH(r.d),s,s,s,s,D.aDk,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.b("Un membre"):x,s,s,s,s,D.aD6,C.X,s,s)
if(t.d)q=A.b("Connexion\u2026")
else if(t.e)q=A.b("Appel termin\xe9")
else q=q==="video"?A.b("Appel vid\xe9o entrant"):A.b("Appel entrant")
w=y.p
q=A.a([r,C.aw,new A.Z(D.rO,x,s),C.k,A.c(q,s,s,s,s,D.wx,s,s,s),D.aA7],w)
if(!t.d&&!t.e){r=A.b("Refuser")
x=t.f?s:new B.buW(t)
v=A.b("Accepter")
u=t.f?s:t.gaHE()
q.push(A.P(A.a([new B.Z6(D.BI,C.aG,r,x,s),D.azV,new B.Z6(C.nN,C.d_,v,u,s)],w),C.n,C.bA,C.i,s))}if(t.d)q.push(C.z4)
return A.e1(s,C.o,A.ft(!0,A.cz(A.I(q,C.n,C.f,C.N),s,s),!0,C.a_,!0,!0),s,s,s)}}
B.Z6.prototype={
D(d){var x=this,w=null,v=A.dk(x.d,w,w,C.a_,C.cK,w)
return A.I(A.a([A.ab(A.b4(!1,A.c0(x.c,C.m,w,32),C.j,w,C.p,w,w,w,w,x.f,w,v),72,72),C.k,A.c(x.e,w,w,w,w,C.dK,w,w,w)],y.p),C.n,C.f,C.N)}}
B.qQ.prototype={
P(){return new B.a_E(A.b8(y.N),C.R)}}
B.a_E.prototype={
S(){var x,w,v,u,t,s,r,q,p,o=this,n=null
o.V()
x=o.a
o.r=x.c
x=x.x
if(x==null)x=new B.b31(B.cpf(),B.cpf())
o.d!==$&&A.aK()
o.d=x
w=o.a
v=w.y
if(v==null)v=new B.a8P(new A.dT(n,n,y.g),new A.dT(n,n,y.n))
o.e!==$&&A.aK()
o.e=v
o.fr=!0
u=new B.acJ()
o.dy!==$&&A.aK()
o.dy=u
t=w.x
if(t!=null){s=$.l_()
r=s.a
q=r.length!==0&&s.z===t&&r===w.c&&s.w}else q=!1
t=$.l_()
s=o.r
r=w.e
p=w.d
t.bib(s,r,x,v,w.f,p)
x=o.a
if(x.as)t.as=!0
if(q){o.Tp()
return}if(x.f)u.u3("assets/audio/tonalite-appel.wav")
o.rX()},
m(){var x=this,w=x.CW
if(w!=null)w.X(0)
w=x.cx
if(w!=null)w.X(0)
w=x.cy
if(w!=null)w.X(0)
w=x.db
if(w!=null)w.X(0)
w=x.dx
if(w!=null)w.X(0)
w=x.dy
w===$&&A.d()
w.ip()
if(x.fr)w.hr()
w=$.l_()
if(!(w.r&&w.a===x.r&&!x.y)){B.c7X()
w=x.d
w===$&&A.d()
w.hr()
w=x.e
w===$&&A.d()
w.Ll()}x.a3()},
Tp(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l
var $async$Tp=A.f(function(d,e){if(d===1){t=e
x=u}while(true)$async$outer:switch(x){case 0:s.a.toString
o=$.K()
s.w=o.gwL()
o=$.l_()
s.Q=o.x
s.as=o.y
s.x=o.e
o=o.f
s.ay=o
if(o!=null){o=Date.now()
n=s.ay
n.toString
s.ch=new A.au(o,0,!1).es(n)}B.cuE(s.r)
u=4
s.a.toString
o=$.K()
x=7
return A.e(o.bW("/messagerie/appels/"+s.r+"/signaux"),$async$Tp)
case 7:r=e
for(o=J.ar(r),n=s.f;o.B();){q=o.gI(o)
p=B.cg_(q)
n.F(0,p.a)
if(p.d==="termine"||p.d==="refuse"||p.d==="annule"){s.mD(A.b("Appel termin\xe9"))
x=1
break $async$outer}}u=2
x=6
break
case 4:u=3
l=t
x=6
break
case 3:x=2
break
case 6:o=s.c!=null
if(!o||s.y){x=1
break}n=s.d
n===$&&A.d()
n.f=new B.buz(s)
n.r=new B.buA(s)
n.w=new B.buB(s)
s.z=!0
if(o)s.k(new B.buC())
s.cy=A.hq(C.ce,new B.buD(s))
o=s.e
o===$&&A.d()
n=o.r
s.db=new A.ca(n,A.x(n).i("ca<1>")).cR(s.gaoc())
o=o.w
s.dx=new A.ca(o,A.x(o).i("ca<1>")).cR(new B.buE())
s.CW=A.hq(C.fW,new B.buF(s))
s.yc()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Tp,w)},
rX(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
var $async$rX=A.f(function(a0,a1){if(a0===1){t=a1
x=u}while(true)switch(x){case 0:s.cx=A.du(C.c9,new B.buh(s))
r="appel"
u=4
q=null
h=s.a
g=h.z
x=g!=null?7:9
break
case 7:x=10
return A.e(g,$async$rX)
case 10:q=a1
h=s.r=B.a7q(q).a
x=8
break
case 9:g=$.K()
x=11
return A.e(g.En(h.c),$async$rX)
case 11:q=a1
h=s.r=s.a.c
case 8:g=$.l_()
g.bhY(h)
B.cuE(s.r)
if(s.a.f)g.VL()
p=B.a7q(q)
if(s.c==null){x=1
break}h=p.w
if(h==="termine"||h==="expire"){s.mD(A.b("Appel termin\xe9"))
x=1
break}s.a.toString
h=$.K()
s.w=h.gwL()
r="ice"
s.a.toString
h=$.K()
o=h.Wm()
n=s.J8()
x=12
return A.e(o,$async$rX)
case 12:m=a1
l=B.cEb(m)
x=15
return A.e(n,$async$rX)
case 15:x=!a1?13:14
break
case 13:if(s.c==null){x=1
break}s.k(new B.bui(s))
x=16
return A.e(A.jT(C.kW,null,y.z),$async$rX)
case 16:if(s.c==null){x=1
break}s.mD(null)
x=1
break
case 14:r="webrtc"
h=s.d
h===$&&A.d()
f=s.a.d
x=17
return A.e(h.An(A.a6(["iceServers",l.a],y.N,y.z),f==="video"),$async$rX)
case 17:h.f=new B.buj(s)
h.r=new B.buk(s)
h.w=new B.bul(s)
if(s.c==null){x=1
break}s.k(new B.bum(s))
g.boa()
s.cy=A.hq(C.ce,new B.bun(s))
h=s.e
h===$&&A.d()
g=h.r
s.db=new A.ca(g,A.x(g).i("ca<1>")).cR(s.gaoc())
g=h.w
s.dx=new A.ca(g,A.x(g).i("ca<1>")).cR(new B.buo())
s.a.toString
g=$.K()
k=g.b
if(k!=null&&J.a8(k)!==0){s.a.toString
$.K()
h.Vi(C.d.je("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.dG(C.bL,k,C.a6,!0))}s.CW=A.hq(C.fW,new B.bup(s))
s.yc()
u=2
x=6
break
case 4:u=3
d=t
j=A.N(d)
i=A.bp(d)
if(s.c==null){x=1
break}A.td().$1("Appel : \xe9chec \xe0 l\u2019\xe9tape "+A.u(r)+" : "+A.u(j)+"\n"+A.u(i))
h=s.c
h.toString
g=j instanceof A.dq?j.a:s.b_E(r)
h.q(y.q).f.v(A.z(null,null,null,null,null,C.h,null,A.c(g,null,null,null,null,null,null,null,null),null,C.l,null,null,null,null,null,null,null,null,null))
s.mD(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$rX,w)},
b_E(d){if(d==="ice")return A.b("Configuration d\u2019appel indisponible. V\xe9rifie ta connexion, puis r\xe9essaie.")
if(d==="webrtc")return A.b("Ce navigateur ne peut pas d\xe9marrer l\u2019appel. Essaie depuis l\u2019application.")
return A.b("Appel introuvable ou d\xe9j\xe0 termin\xe9.")},
J8(){var x=0,w=A.k(y.y),v,u=2,t,s=this,r,q,p
var $async$J8=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
x=7
return A.e(s.a0l(),$async$J8)
case 7:if(!e){v=!1
x=1
break}r=s.d
r===$&&A.d()
x=8
return A.e(r.Fb(s.a.d==="video"),$async$J8)
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
return A.j($async$J8,w)},
a0l(){var x=0,w=A.k(y.y),v
var $async$a0l=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a0l,w)},
yc(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$yc=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.y){x=1
break}u=4
s.a.toString
p=$.K()
x=7
return A.e(p.bW("/messagerie/appels/"+s.r+"/signaux"),$async$yc)
case 7:r=e
for(p=J.ar(r);p.B();){q=p.gI(p)
s.aod(B.cg_(q))}u=2
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
return A.j($async$yc,w)},
aod(d){var x,w,v,u,t,s=this
if(s.c==null||s.y)return
x=s.f
w=d.a
if(x.t(0,w))return
x.F(0,w)
x=s.w
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.cvt(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.DR(A.a6(["sdp",v.a,"type",v.b],y.N,y.z)).aK(new B.buH(s),y.a).fI(new B.buI(s))
break
case"reponse":if(!s.a.f)return
u=B.cvt(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.UR(A.a6(["sdp",u.a,"type",u.b],y.N,y.z)).aK(new B.buJ(s),y.a).fI(new B.buK(s))
break
case"candidat_ice":t=B.cUP(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.UM(A.a6(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.x)return
x=s.d
x===$&&A.d()
x.Lc().aK(new B.buL(s),y.a).fI(new B.buM(s))
break
case"refuse":s.mD(A.b("Appel refus\xe9"))
break
case"annule":s.mD(A.b("Appel annul\xe9"))
break
case"termine":s.mD(A.b("Appel termin\xe9"))
break}},
SY(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$SY=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:if(u.x){x=1
break}t=u.cx
if(t!=null)t.X(0)
t=u.dy
t===$&&A.d()
t.ip()
u.k(new B.buu(u,!1))
t=$.l_()
t.bq2()
s=u.Q
t.a8U(u.as,s)
case 1:return A.i(v,w)}})
return A.j($async$SY,w)},
y0(d,e,f){return this.aQH(d,e,f)},
agU(d,e){return this.y0(d,e,!0)},
aQH(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$y0=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
t.a.toString
s=$.K()
x=6
return A.e(s.ask(t.r,e,d),$async$y0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(f&&t.c!=null&&!t.y)t.mD(A.b("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$y0,w)},
Jk(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$Jk=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
r=s.cx
if(r!=null)r.X(0)
r=s.dy
r===$&&A.d()
r.ip()
u=4
r=s.r
x=r.length!==0?7:8
break
case 7:s.a.toString
q=$.K()
x=9
return A.e(q.LG(r,"termine"),$async$Jk)
case 9:case 8:u=2
x=6
break
case 4:u=3
o=t
x=6
break
case 3:x=2
break
case 6:B.c7X()
$.l_().NK()
r=s.c
if(r!=null)A.a2(r,!1).bN()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Jk,w)},
aly(){var x=this
if(!x.x||x.y)return
$.l_().brk()
x.k(new B.buv(x))
$.aQ.bo$.push(new B.buw(x))},
mD(d){var x,w,v=this,u=null
if(v.y)return
v.y=!0
x=v.cx
if(x!=null)x.X(0)
x=v.dy
x===$&&A.d()
x.ip()
x=v.r
if(x.length!==0){v.a.toString
w=$.K()
w.LG(x,"termine").fI(new B.buG())}if(d!=null&&v.c!=null)v.c.q(y.q).f.v(A.z(u,u,u,u,u,C.h,u,A.c(d,u,u,u,u,u,u,u,u),u,C.l,u,u,u,u,u,u,u,u,u))
B.c7X()
$.l_().NK()
x=v.c
if(x!=null)A.a2(x,!1).bN()},
Q2(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Q2=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.a_c(u),$async$Q2)
case 2:if(v.c!=null)v.k(new B.bue(v,u))
$.l_().a8U(v.as,u)
return A.i(null,w)}})
return A.j($async$Q2,w)},
Q1(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Q1=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v.at=!1
u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Gq(u),$async$Q1)
case 2:if(v.c!=null)v.k(new B.bud(v,u))
$.l_().a8U(u,v.Q)
return A.i(null,w)}})
return A.j($async$Q1,w)},
PZ(){var x=0,w=A.k(y.H),v=this,u,t
var $async$PZ=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.ax
t=v.d
t===$&&A.d()
x=2
return A.e(t.a_9(u),$async$PZ)
case 2:if(v.c!=null)v.k(new B.buc(v,u))
return A.i(null,w)}})
return A.j($async$PZ,w)},
Q_(){var x=0,w=A.k(y.H),v=this,u
var $async$Q_=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.UY(),$async$Q_)
case 2:return A.i(null,w)}})
return A.j($async$Q_,w)},
anj(){var x,w=this,v="Appel en cours\u2026",u=w.fx
if(u!=null)return u
if(w.x){u=A.b(v)
x=C.c.ae(w.ch.a,1e6)
return u+" "+(C.d.aU(C.c.l(C.c.ae(x,60)),2,"0")+":"+C.d.aU(C.c.l(C.c.a0(x,60)),2,"0"))}if(w.z)return w.a.f?A.b("\xc7a sonne\u2026"):A.b(v)
return A.b("Connexion\u2026")},
bcT(){var x,w=null,v=this.c
v.toString
x=A.b("La vid\xe9o n\u2019est pas disponible pendant un appel audio.")
v.q(y.q).f.v(A.z(w,w,w,w,w,C.h,w,A.c(x,w,w,w,w,w,w,w,w),w,C.l,w,w,w,w,w,w,w,w,w))},
b2i(){var x,w=this,v=null,u=A.a([],y.p)
if(w.a.d==="video")u.push(A.bR(!1,v,v,v,!0,v,v,!0,!1,D.a75,v,v,v,new B.bur(w),!1,v,v,v,v,v,A.c(A.b("Basculer"),v,v,v,v,C.dK,v,v,v),v,v))
if(w.x)u.push(A.bR(!1,v,v,v,!0,v,v,!0,!1,D.a6Q,v,v,v,new B.bus(w),!1,v,v,v,v,v,A.c(A.b("R\xe9duire"),v,v,v,v,C.dK,v,v,v),v,v))
if(u.length===0)return
x=w.c
x.toString
A.jH(D.zH,new B.but(u),x,!1,v,y.H)},
D(d){var x,w,v,u,t,s,r,q=this,p=null,o=q.d
o===$&&A.d()
x=o.c
w=q.go
v=q.a
if(v.d==="video"&&q.z){if(x!=null)x=B.cfO(o.e,!1,D.P2)
else{x=v.e
v=v.r
u=q.fy&&q.x
x=A.cz(A.I(A.a([new B.NP(x,v,u,56,p),C.q,B.ctp(x,22),C.k,A.c(q.anj(),p,p,p,p,D.wx,p,p,p)],y.p),C.n,C.f,C.N),p,p)}o=A.a([A.Er(0,x),A.f3(p,A.eI(A.Q(12),B.cfO(o.d,!0,D.P2),C.ap),160,p,p,16,16,110)],y.p)
if(q.x)o.push(A.f3(p,new B.Z7(q.galx(),p),p,p,16,p,16,p))
x=q.Q
v=q.as
o.push(A.f3(24,B.cro(q.ax,!0,v,x,q.gae3(),q.gae4(),q.gae5(),q.gakC(),q.gala(),q.gapg(),!0),p,p,0,0,p,p))
o=A.e2(C.aP,o,C.h,C.aH,p)}else{x=y.p
v=A.a([],x)
if(q.fy)v.push(A.f3(p,A.re(B.cfO(o.e,!1,D.vg),0),1,p,0,p,0,1))
if(q.x)v.push(A.f3(p,new B.Z7(q.galx(),p),p,p,16,p,16,p))
o=B.ctp(q.a.e,24)
u=A.c(q.anj(),p,p,p,p,D.wx,C.X,p,p)
t=q.a
s=t.e
t=t.r
t=A.a9(A.cz(new B.NP(s,t,q.fy&&q.x,88,p),p,p),1,p)
s=q.Q
r=q.as
v.push(A.I(A.a([C.q,o,C.k,new A.Z(D.rO,u,p),t,B.cro(q.ax,!1,r,s,q.gae3(),q.gae4(),q.gae5(),q.gakC(),q.gala(),q.gapg(),q.x),C.q],x),C.n,C.f,C.i))
v=A.e2(C.aP,v,C.h,C.aH,p)
o=v}return A.cfy(w,A.e1(p,C.o,A.ft(!0,o,!0,C.a_,!0,!0),p,p,p),new B.buN(q),y.K)}}
B.akv.prototype={
D(d){var x,w,v=this,u=null,t=A.Q(28),s=A.a9(new B.A4(D.a4R,v.e,A.b("Haut-parleur"),v.x,u,u),1,u),r=v.f?D.BS:D.a4Q,q=A.b("Appel vid\xe9o")
r=A.a9(new B.A4(r,!1,q,v.c?v.y:v.z,u,u),1,u)
q=v.d
x=q?D.a4M:D.a4L
w=y.p
q=A.P(A.a([s,r,A.a9(new B.A4(x,q,A.b("Muet"),v.w,u,u),1,u)],w),C.n,C.f,C.i,u)
x=A.b("Plus")
return A.S(u,A.I(A.a([q,C.q,A.P(A.a([A.a9(new B.A4(C.BP,!1,x,v.r?v.Q:u,u,u),1,u),A.a9(new B.A4(D.BI,!1,A.b("Terminer"),v.as,C.aG,u),1,u),D.a3C],w),C.n,C.f,C.i,u)],w),C.n,C.f,C.N),C.j,u,u,new A.a4(D.zH,u,u,t,u,u,C.v),u,u,u,C.AO,D.a3k,u,u,u)}}
B.Z7.prototype={
D(d){var x=null
return A.I(A.a([A.ab(A.b4(!1,D.a6P,C.j,x,C.p,x,x,x,x,this.c,x,A.dk(C.kP,x,x,C.a_,C.cK,x)),48,48),C.H,A.c(A.b("R\xe9duire"),x,x,x,x,C.Rq,x,x,x)],y.p),C.n,C.f,C.N)}}
B.A4.prototype={
D(d){var x,w,v,u=this,t=null,s=u.r,r=s==null
if(r)s=u.d?C.m:C.kP
if(!r)x=C.m
else x=u.d?C.o:C.m
r=u.f
w=r==null?0.4:1
v=A.dk(s,t,t,C.a_,C.cK,t)
return A.re(A.I(A.a([A.ab(A.b4(!1,A.c0(u.c,x,t,30),C.j,t,C.p,t,t,t,t,r,t,v),72,72),C.k,A.c(u.e,t,t,t,t,C.wz,C.X,t,t)],y.p),C.n,C.f,C.N),w)}}
B.NP.prototype={
P(){return new B.ap8(null,null)}}
B.ap8.prototype={
S(){var x,w=this
w.V()
x=A.cq(null,A.cY(0,0,w.a.e?1100:2400,0,0),null,1,null,w)
x.a9L(0,!0)
w.d!==$&&A.aK()
w.d=x},
aT(d){var x,w
this.bf(d)
x=this.a.e
if(d.e!==x){w=this.d
w===$&&A.d()
w.e=A.cY(0,0,x?1100:2400,0,0)
w.a9L(0,!0)}},
m(){var x=this.d
x===$&&A.d()
x.m()
this.aFr()},
D(d){var x,w=this,v=null,u=w.a,t=u.f,s=t*2,r=s+24,q=w.d
q===$&&A.d()
x=u.d
u=x!=null?A.jO(v,x,v,v,t):A.jO(C.t,v,A.c(B.caH(u.c),v,v,v,v,A.c8(v,v,C.o,v,v,v,v,v,v,v,v,w.a.f*0.7,v,v,C.A,v,v,!0,v,v,v,v,v,v,v,v),v,v,v),v,t)
return A.ab(A.ib(q,new B.bQB(w,s),u),r,r)}}
B.a5P.prototype={
m(){var x=this,w=x.bR$
if(w!=null)w.T(0,x.ghK())
x.bR$=null
x.a3()},
cd(){this.dg()
this.d4()
this.hL()}}
B.b31.prototype={
Fb(d){return this.bpS(d)},
bpS(d){var x=0,w=A.k(y.H),v,u=this,t,s,r,q
var $async$Fb=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(u.b!=null){x=1
break}t=u.d
x=3
return A.e(t.jy(0),$async$Fb)
case 3:$.cj2()
s=y.N
r=A.a6(["echoCancellation",!0,"noiseSuppression",!0,"autoGainControl",!0],s,y.y)
x=4
return A.e(new B.aTj().Gd(0,A.a6(["audio",r,"video",d&&A.a6(["facingMode","user"],s,s)],s,y.z)),$async$Fb)
case 4:q=f
u.b=q
t.sac_(0,q)
case 1:return A.i(v,w)}})
return A.j($async$Fb,w)},
An(d,e){return this.bqC(d,e)},
bqC(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q
var $async$An=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(v.e.jy(0),$async$An)
case 2:x=v.b==null?3:4
break
case 3:x=5
return A.e(v.Fb(e),$async$An)
case 5:case 4:u=v.b
u.toString
x=6
return A.e($.cj2().a6P(d,A.C(y.N,y.z)),$async$An)
case 6:t=v.a=g
s=u.abb(0),r=s.length,q=0
case 7:if(!(q<s.length)){x=9
break}x=10
return A.e(t.a5F(0,s[q],u),$async$An)
case 10:case 8:s.length===r||(0,A.R)(s),++q
x=7
break
case 9:t.e=new B.b32(v)
t.Q=new B.b33(v)
t.d=new B.b34(v)
return A.i(null,w)}})
return A.j($async$An,w)},
aOC(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sac_(0,d)
w.H4()
x=w.r
if(x!=null)x.$0()}},
H4(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o,n,m,l
var $async$H4=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:n=t.z?0.8:1
m=t.c
m=m==null?null:m.On(0)
if(m==null)m=C.dl
q=m.length
p=0
case 2:if(!(p<m.length)){x=4
break}s=m[p]
v=6
x=9
return A.e(B.aVz(n,s),$async$H4)
case 9:v=1
x=8
break
case 6:v=5
l=u
r=A.N(l)
A.td().$1("Appel : volume distant impossible : "+A.u(r))
x=8
break
case 5:x=1
break
case 8:case 3:m.length===q||(0,A.R)(m),++p
x=2
break
case 4:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$H4,w)},
Lc(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Lc=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.o(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Vx(0),$async$Lc)
case 3:t=e
x=4
return A.e(s.Gr(0,t),$async$Lc)
case 4:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Lc,w)},
DR(d){return this.bhn(d)},
bhn(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$DR=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.o(A.am("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Gt(0,new B.Ey(d.h(0,"sdp"),d.h(0,"type"))),$async$DR)
case 3:x=4
return A.e(s.Vu(0),$async$DR)
case 4:t=f
x=5
return A.e(s.Gr(0,t),$async$DR)
case 5:v=A.a6(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$DR,w)},
UR(d){return this.bec(d)},
bec(d){var x=0,w=A.k(y.H),v=this,u
var $async$UR=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.o(A.am("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.Gt(0,new B.Ey(d.h(0,"sdp"),d.h(0,"type"))),$async$UR)
case 2:return A.i(null,w)}})
return A.j($async$UR,w)},
UM(d){return this.bdY(d)},
bdY(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$UM=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.Uz(new B.KJ(A.an(d.h(0,"candidate")),A.an(d.h(0,"sdpMid")),A.dW(d.h(0,"sdpMLineIndex")))),$async$UM)
case 3:case 1:return A.i(v,w)}})
return A.j($async$UM,w)},
a_c(d){return this.azK(d)},
azK(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$a_c=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.On(0)
if(r==null)r=C.dl
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.R)(r),++s)r[s].slO(0,t)
return A.i(null,w)}})
return A.j($async$a_c,w)},
Gq(d){return this.azA(d)},
azA(d){var x=0,w=A.k(y.H),v=this
var $async$Gq=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.z=d
x=2
return A.e(B.adA(d),$async$Gq)
case 2:x=3
return A.e(v.H4(),$async$Gq)
case 3:return A.i(null,w)}})
return A.j($async$Gq,w)},
a_9(d){return this.azq(d)},
azq(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$a_9=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.OA(0)
if(s==null)s=C.dl
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.R)(s),++t)s[t].slO(0,d)
return A.i(null,w)}})
return A.j($async$a_9,w)},
UY(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$UY=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.OA(0)
if(s==null)s=D.am0
if(s.length===0){x=1
break}x=3
return A.e(B.ceJ(C.b.gU(s)),$async$UY)
case 3:case 1:return A.i(v,w)}})
return A.j($async$UY,w)},
hr(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$hr=A.f(function(d,a0){if(d===1){t=a0
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
x=7
return A.e(B.adA(!1),$async$hr)
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
p=p==null?null:p.aa(0)
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
p=p==null?null:p.abb(0)
if(p==null)p=C.dl
o=p.length
n=y.c
m=y._
l=0
case 13:if(!(l<p.length)){x=15
break}r=p[l]
u=17
k=J.cCG(r)
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
case 19:case 14:p.length===o||(0,A.R)(p),++l
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
B.a8P.prototype={
Vi(d){return this.bfD(d)},
bfD(d){var x=0,w=A.k(y.H),v=this
var $async$Vi=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.H2(),$async$Vi)
case 2:return A.i(null,w)}})
return A.j($async$Vi,w)},
H2(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$H2=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a8(r)===0){x=1
break}u=4
q=B.cCM(B.cdF(A.cI(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$H2)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cP(p,A.x(p).i("cP<1>")).b8(s.gb5f(),!0,s.gb3G(),new B.aDM(s))
u=2
x=6
break
case 4:u=3
n=t
s.a3C()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$H2,w)},
b5g(d){var x,w,v,u
try{x=C.Z.cK(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.r(J.m(x,"type"),"signal_appel"))return
w=J.m(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.F(0,B.cg_(w))}catch(u){}},
a3C(){var x,w=this,v=w.c
if(v!=null)v.X(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.F(0,null)
return}x=D.agr[v]
w.f=v+1
v=w.d
if(v!=null)v.X(0)
w.d=A.du(A.cY(0,0,0,0,x),new B.aDN(w))},
Ll(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$Ll=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.X(0)
s=t.c
s=s==null?null:s.X(0)
x=2
return A.e(y.x.b(s)?s:A.dw(s,y.H),$async$Ll)
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
r=s.w=new B.aun(s,q)}s=r.aa(0)}x=7
return A.e(y._.b(s)?s:A.dw(s,y.z),$async$Ll)
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
return A.j($async$Ll,w)}}
B.acJ.prototype={
u3(d){return this.bnm(d)},
bnm(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$u3=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:v=3
r=t.a
x=6
return A.e((r==null?t.a=A.Bk():r).aV(0),$async$u3)
case 6:x=7
return A.e(t.a.a_8(d),$async$u3)
case 7:x=8
return A.e(t.a.jj(C.JX),$async$u3)
case 8:x=9
return A.e(t.a.ii(1),$async$u3)
case 9:x=10
return A.e(t.a.cZ(0),$async$u3)
case 10:v=1
x=5
break
case 3:v=2
p=u
s=A.N(p)
A.td().$1("Sonnerie appel : lecture impossible ("+d+") : "+A.u(s))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$u3,w)},
ip(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$ip=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
s=s==null?null:s.aV(0)
x=6
return A.e(y.x.b(s)?s:A.dw(s,y.H),$async$ip)
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
return A.j($async$ip,w)},
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
B.aYK.prototype={
a6P(d,e){return this.bhc(d,e)},
bhc(d,e){var x=0,w=A.k(y.J),v,u,t,s,r
var $async$a6P=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a6(["mandatory",A.C(r,r),"optional",A.a([A.a6(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fT(u,y.N,y.z)
t.u(0,d)
s=new r(y.m.a(A.cd(t)))
t=J.l(s)
v=B.cKi(C.cj.gkn().bi(new A.eJ(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a6P,w)}}
B.us.prototype={
On(d){var x=A.a([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.da(w,A.W(w).i("da<1,aE>"))
J.hv(w,new B.aTz(x))
return x},
OA(d){var x=A.a([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.da(w,A.W(w).i("da<1,aE>"))
J.hv(w,new B.aTA(x))
return x},
abb(d){var x=A.G(this.On(0),!0,y.G)
C.b.u(x,this.OA(0))
return x}}
B.adc.prototype={
aGM(d){var x=this,w=x.d
w.addEventListener("ended",A.c_(new B.aTw(x)))
w.addEventListener("mute",A.c_(new B.aTx(x)))
w.addEventListener("unmute",A.c_(new B.aTy(x)))},
slO(d,e){this.d.enabled=e},
US(d,e){return this.bef(0,e)},
bef(d,e){var x=0,w=A.k(y.H),v=this
var $async$US=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:x=2
return A.e(A.ei(v.d.applyConstraints(y.m.a(A.cd(e))),y.X),$async$US)
case 2:return A.i(null,w)}})
return A.j($async$US,w)},
aV(d){var x=0,w=A.k(y.H),v=this
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aV,w)}}
B.aTj.prototype={
Gd(d,e){return this.ayw(0,e)},
ayw(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$Gd=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cXd())if(y.f.b(e.h(0,"video"))&&J.m(e.h(0,"video"),"facingMode")!=null)J.ji(e.h(0,"video"),"facingMode")
e.cV(0,"video",new B.aTl())
e.cV(0,"audio",new B.aTm())}catch(a0){A.oY("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hd(e.h(0,"audio"),i,i).aD(0,"optional")&&y.F.b(J.m(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.m(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.hv(s,new B.aTn(r))
J.ji(e.h(0,"audio"),"optional")
J.jI(e.h(0,"audio"),r)}}catch(a0){q=A.N(a0)
p=A.bp(a0)
A.oY("[getUserMedia] failed to translate optional audio constraints, "+A.u(q)+", "+A.u(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.cd(e)
x=10
return A.e(A.ei(o.getUserMedia(h.a(n)),h),$async$Gd)
case 10:m=a2
v=new B.us(m,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.ei(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$Gd)
case 11:l=a2
v=new B.us(l,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.N(f)
i=J.l(k)
throw A.o("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Gd,w)}}
B.af4.prototype={
aGV(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.c_(new B.aYM(x)))
w.addEventListener("icecandidate",A.c_(new B.aYN(x)))
w.addEventListener("iceconnectionstatechange",A.c_(new B.aYO(x)))
w.onicegatheringstatechange=A.c_(new B.aYP(x))
w.addEventListener("signalingstatechange",A.c_(new B.aYQ(x)))
if(!$.ciO())w.addEventListener("connectionstatechange",A.c_(new B.aYR(x)))
w.addEventListener("negotiationneeded",A.c_(new B.aYS(x)))
w.addEventListener("track",A.c_(new B.aYT(x)))},
Vx(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Vx=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.ei(s.createOffer(y.m.a(A.cd(A.C(y.N,y.z)))),y.A),$async$Vx)
case 3:t=f
v=new B.Ey(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Vx,w)},
Vu(d){var x=0,w=A.k(y.v),v,u=this,t,s
var $async$Vu=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.ei(s.createAnswer(y.m.a(A.cd(A.C(y.N,y.z)))),y.A),$async$Vu)
case 3:t=f
v=new B.Ey(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Vu,w)},
Gr(d,e){return this.azE(0,e)},
azE(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$Gr=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.ei(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$Gr)
case 2:return A.i(null,w)}})
return A.j($async$Gr,w)},
Gt(d,e){return this.azU(0,e)},
azU(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$Gt=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.ei(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$Gt)
case 2:return A.i(null,w)}})
return A.j($async$Gt,w)},
Uz(d){return this.bdA(d)},
bdA(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$Uz=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.ei(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$Uz)
case 2:return A.i(null,w)}})
return A.j($async$Uz,w)},
aa(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$aa=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.d2(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aa,w)},
a5F(d,e,f){return this.bdR(0,e,f)},
bdR(d,e,f){var x=0,w=A.k(y.e),v,u=this,t
var $async$a5F=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.addTrack(e.d,f.e)
v=new B.af5()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a5F,w)}}
B.af5.prototype={}
B.cfN.prototype={
aV(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.N(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.o("Unable to RTCRtpTransceiver::stop: "+A.u(s))}else throw r}return A.i(null,w)}})
return A.j($async$aV,w)}}
B.Vc.prototype={
sauC(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.M0()
if(x!=null)x.style.objectFit=e},
aok(){var x=this,w=x.M0(),v=x.a,u=w==null,t=u?null:w.videoWidth
if(t==null)t=0
u=u?null:w.videoHeight
if(u==null)u=0
x.sn(0,v.arm(u,x.z!=null,0,t))},
sac_(d,e){var x,w,v,u,t=this
t.z=e
if(e.OA(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.ar(y.l.b(x)?x:new A.da(x,A.W(x).i("da<1,aE>")))
for(;x.B();){w=x.gI(x)
t.x.addTrack(w)}}if(e.On(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.ar(y.l.b(x)?x:new A.da(x,A.W(x).i("da<1,aE>")))
for(;x.B();){w=x.gI(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aQu()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.M0()
if(u!=null){u.srcObject=t.x
x=t.M0()
x.toString
t.adS(x)}t.sn(0,t.a.bg0(t.z!=null))},
aQu(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
M0(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
m(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$m=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.R)(t),++r)t[r].X(0)
q=u.M0()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
t=u.w
if(t!=null)t.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
v=u.eU()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$m,w)},
jy(d){var x=0,w=A.k(y.H),v=this
var $async$jy=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:$.GW()
$.qr().uj("RTCVideoRenderer-"+v.Q,new B.aYZ(v),!0)
return A.i(null,w)}})
return A.j($async$jy,w)},
adS(d){if(this.as)d.style.transform="scaleX(-1)"
d.style.objectFit=this.ax
d.style.border="none"
d.style.width="100%"
d.style.height="100%"}}
B.Ve.prototype={
P(){return new B.Vf()}}
B.Vf.prototype={
S(){var x,w,v=this
v.V()
v.a.c.aj(0,v.gb1q())
x=v.a
w=x.c
w.as=x.e
w.sauC(0,x.d===D.vg?"contain":"cover")},
b1r(){if(this.c!=null)this.k(new B.aZ_())},
m(){if(this.c!=null)this.a3()},
aT(d){var x,w
this.bf(d)
A.du(A.cY(0,0,10,0,0),new B.aZ1(this))
x=this.a
w=x.c
w.sauC(0,x.d===D.vg?"contain":"cover")},
D(d){return new A.iF(new B.aZ0(this),null)}}
B.abl.prototype={
aGt(d,e,f,g){var x=this,w=$.aL
x.a!==$&&A.aK()
x.a=new B.a0y(d,x,new A.bf(new A.aC(w,y.c),y.r),e,g.i("a0y<0>"))
if(f.a.gja())f.a=new B.WR(g.i("@<0>").cb(g).i("WR<1,2>")).hM(f.a)
w=A.h5(null,new B.aMm(f,x),null,!0,g)
x.b!==$&&A.aK()
x.b=w},
aks(){var x,w
this.d=!0
x=this.c
if(x!=null)x.X(0)
w=this.b
w===$&&A.d()
w.aa(0)}}
B.a0y.prototype={
F(d,e){if(this.e)throw A.o(A.am("Cannot add event after closing."))
if(this.d)return
this.a.a.F(0,e)},
dB(d,e){if(this.e)throw A.o(A.am("Cannot add event after closing."))
if(this.d)return
this.aTp(d,e)},
i5(d){return this.dB(d,null)},
aTp(d,e){var x=this
if(x.w){x.a.a.dB(d,e)
return}x.c.hl(d,e)
x.akt()
x.b.aks()
x.a.a.aa(0).fI(new B.bA1())},
aa(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.aks()
x.c.cI(0,x.a.a.aa(0))}return x.c.a},
akt(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dS(0)
return},
$ie7:1}
B.ahs.prototype={}
B.aht.prototype={}
B.Br.prototype={
afl(d,e){var x=this.b
if((x.b&4)!==0)return
x.F(0,new B.HH(d,e))
x.aa(0)},
abt(d){var x
if((this.b.b&4)!==0)throw A.o(B.cgt())
x=A.cd(d)
x.toString
this.a.send(x)},
z5(d,e,f){return this.bfm(0,e,f)},
bfm(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$z5=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.o(B.cgt())
u.aa(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$z5,w)},
$icgs:1}
B.vp.prototype={}
B.M0.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.M0&&e.a===this.a},
gH(d){return C.d.gH(this.a)}}
B.Hf.prototype={
p(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.Hf&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.hK(this.a)},
l(d){return"BinaryDataReceived("+A.u(this.a)+")"}}
B.HH.prototype={
p(d,e){if(e==null)return!1
return e instanceof B.HH&&e.a===this.a&&e.b===this.b},
gH(d){return A.hK([this.a,this.b])},
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
B.axP.prototype={
aGb(d){d.fs(new B.axT(this),new B.axU(this),y.a)}}
B.aun.prototype={
aa(d){var x=this.b
x.e=x.d=null
return this.aBC(0)}}
B.aiP.prototype={
l(d){return"WebSocketChannelException: "+this.a},
$ibK:1}
B.z8.prototype={
O(){return"RTCSignalingState."+this.b}}
B.V8.prototype={
O(){return"RTCIceGatheringState."+this.b}}
B.z7.prototype={
O(){return"RTCPeerConnectionState."+this.b}}
B.oo.prototype={
O(){return"RTCIceConnectionState."+this.b}}
B.af6.prototype={
O(){return"RTCVideoViewObjectFit."+this.b}}
B.aYJ.prototype={}
B.TC.prototype={}
B.JT.prototype={
l(d){var x=this.d
return"Track(id: "+A.u(x.id)+", kind: "+A.u(x.kind)+", label: "+A.u(x.label)+", enabled: "+A.u(x.enabled)+", muted: "+A.u(x.muted)+")"}}
B.aTi.prototype={}
B.KJ.prototype={}
B.V9.prototype={}
B.Va.prototype={}
B.aYU.prototype={}
B.Ey.prototype={}
B.Vb.prototype={}
B.Vd.prototype={
arm(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.Vd(x,w,v)},
bg0(d){return this.arm(null,d,null,null)},
l(d){var x=this
return A.ae(x).l(0)+"(width: "+A.u(x.a)+", height: "+A.u(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["av<~>()","~()","~(LC)","bz(KJ)","bz(Vb)","bz(oo)","~(@)","us(@)","bz(cgs)","~(vp)"])
B.b3E.prototype={
$0(){return J.cC0(this.a.bl())},
$S:1}
B.b3F.prototype={
$1(d){var x,w,v,u
try{this.b.F(0,this.a.$ti.y[1].a(d))}catch(v){u=A.N(v)
if(y.i.b(u)){x=u
w=A.bp(v)
this.b.dB(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.c9F.prototype={
$1(d){var x,w,v,u=$.K().b
if(u==null||u.length===0)return
x=self
w=new x.Headers()
w.set("Authorization","Bearer "+A.u(u))
w.set("Content-Type","application/json")
v=y.N
x.window.fetch("https://connexion-prophetique.onrender.com/messagerie/appels/"+this.a+"/signaux",{method:"POST",headers:w,body:C.Z.dJ(A.a6(["type","termine","contenu",A.C(v,y.z)],v,y.K),null),keepalive:!0})},
$S:26}
B.c9E.prototype={
$0(){return self.window.removeEventListener("beforeunload",this.a)},
$S:0}
B.aA2.prototype={
$1(d){if(d==null)return null
return A.bQ(J.l(d))},
$S:116}
B.buX.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.Jq(!0)},
$S:0}
B.buY.prototype={
$1(d){return this.a.Um()},
$S:31}
B.buU.prototype={
$0(){var x=this.a.c
if(x!=null)A.a2(x,!1).bN()},
$S:0}
B.buV.prototype={
$0(){return this.a.e=!0},
$S:0}
B.buR.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.buS.prototype={
$0(){return this.a.d=!1},
$S:0}
B.buT.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.buO.prototype={
$0(){return this.a.f=!0},
$S:0}
B.buP.prototype={
$0(){return this.a.f=!1},
$S:0}
B.buQ.prototype={
$1(d){var x=null,w=this.a.a,v=w.c,u=w.e,t=w.d
return B.cei(w.w,x,v,w.y,t,x,x,x,!1,u)},
$S:1211}
B.buW.prototype={
$0(){return this.a.b5x()},
$S:0}
B.buz.prototype={
$1(d){this.a.y0("candidat_ice",d,!1)},
$S:246}
B.buA.prototype={
$0(){var x=this.a
if(x.c!=null)x.k(new B.buy(x))},
$S:0}
B.buy.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.buB.prototype={
$0(){this.a.mD(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.buC.prototype={
$0(){},
$S:0}
B.buD.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.k(new B.bux(x,w))},
$S:31}
B.bux.prototype={
$0(){return this.a.ch=new A.au(Date.now(),0,!1).es(this.b)},
$S:0}
B.buE.prototype={
$1(d){},
$S:136}
B.buF.prototype={
$1(d){this.a.yc()},
$S:31}
B.buh.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.x&&!x.y){if(x.a.f)x.y0("annule",C.bn,!1)
x.mD(A.b("Pas de r\xe9ponse"))}},
$S:0}
B.bui.prototype={
$0(){var x=this.a
x.fx=x.a.d==="video"?A.b("Micro ou cam\xe9ra refus\xe9 : autorise le micro et la cam\xe9ra dans les r\xe9glages pour appeler en vid\xe9o."):A.b("Micro refus\xe9 : autorise le micro dans les r\xe9glages pour appeler.")},
$S:0}
B.buj.prototype={
$1(d){this.a.y0("candidat_ice",d,!1)},
$S:246}
B.buk.prototype={
$0(){var x=this.a
if(x.c!=null)x.k(new B.bug(x))},
$S:0}
B.bug.prototype={
$0(){return this.a.fy=!0},
$S:0}
B.bul.prototype={
$0(){this.a.mD(A.b("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.bum.prototype={
$0(){return this.a.z=!0},
$S:0}
B.bun.prototype={
$1(d){var x=this.a,w=x.ay
if(x.c!=null&&w!=null&&x.x)x.k(new B.buf(x,w))},
$S:31}
B.buf.prototype={
$0(){return this.a.ch=new A.au(Date.now(),0,!1).es(this.b)},
$S:0}
B.buo.prototype={
$1(d){},
$S:136}
B.bup.prototype={
$1(d){this.a.yc()},
$S:31}
B.buH.prototype={
$1(d){var x=this.a
if(x.c==null||x.y)return
x.SY()
x.agU("reponse",d)},
$S:409}
B.buI.prototype={
$1(d){this.a.mD(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buJ.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.SY()},
$S:32}
B.buK.prototype={
$1(d){this.a.mD(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buL.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.y)x.agU("offre",d)},
$S:409}
B.buM.prototype={
$1(d){this.a.mD(A.b("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.buu.prototype={
$0(){var x=this.a
x.x=!0
x.ay=new A.au(Date.now(),0,!1)
x.ch=C.R},
$S:0}
B.buv.prototype={
$0(){return this.a.go=!0},
$S:0}
B.buw.prototype={
$1(d){var x=this.a.c
if(x!=null)A.a2(x,!1).bN()},
$S:5}
B.buG.prototype={
$1(d){return A.C(y.N,y.z)},
$S:105}
B.bue.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.bud.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.buc.prototype={
$0(){return this.a.ax=this.b},
$S:0}
B.bur.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a2(w,!1).bN()
x.Q_()},
$S:0}
B.bus.prototype={
$0(){var x=this.a,w=x.c
w.toString
A.a2(w,!1).XL().aK(new B.buq(x),y.H)},
$S:0}
B.buq.prototype={
$1(d){return this.a.aly()},
$S:9}
B.but.prototype={
$1(d){return A.ft(!0,A.I(this.a,C.n,C.f,C.N),!0,C.a_,!0,!0)},
$S:133}
B.buN.prototype={
$2(d,e){if(!d)this.a.Jk()},
$S:1215}
B.bQB.prototype={
$2(d,e){var x,w,v,u=null,t=this.a,s=t.d
s===$&&A.d()
s=s.x
s===$&&A.d()
t=t.a.e
x=t?0.07:0.04
t=t?0.55:0.35
w=this.b
v=w+20
s=A.cqJ(A.S(u,u,C.j,u,u,new A.a4(u,u,A.bl(C.t.b5(t*(1-s)),3),u,u,u,C.aI),u,v,u,u,u,u,u,v),1+x*s)
w+=8
w=A.S(u,u,C.j,u,u,new A.a4(u,u,A.bl(C.t,2),u,u,u,C.aI),u,w,u,u,u,u,u,w)
e.toString
return A.e2(C.a5,A.a([s,w,e],y.p),C.h,C.aH,u)},
$S:1216}
B.b32.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a6(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+3}
B.b33.prototype={
$1(d){var x=d.b,w=x.length!==0?C.b.gU(x):null
if(w!=null)this.a.aOC(w)},
$S:z+4}
B.b34.prototype={
$1(d){var x
if(d===D.OU){x=this.a.w
if(x!=null)x.$0()}},
$S:z+5}
B.aDM.prototype={
$1(d){return this.a.a3C()},
$S:22}
B.aDN.prototype={
$0(){var x=this.a
if(!x.e)x.H2()},
$S:0}
B.caI.prototype={
$1(d){return d.length!==0},
$S:8}
B.aTz.prototype={
$1(d){return this.a.push(B.cf7(d))},
$S:22}
B.aTA.prototype={
$1(d){return this.a.push(B.cf7(d))},
$S:22}
B.aTw.prototype={
$1(d){},
$S:27}
B.aTx.prototype={
$1(d){},
$S:27}
B.aTy.prototype={
$1(d){},
$S:27}
B.aTl.prototype={
$0(){return!1},
$S:51}
B.aTm.prototype={
$0(){return!1},
$S:51}
B.aTn.prototype={
$1(d){J.hv(d,new B.aTk(this.a))},
$S:246}
B.aTk.prototype={
$2(d,e){this.a.j(0,d,e)},
$S:55}
B.aYM.prototype={
$1(d){},
$S:27}
B.aYN.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.KJ(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:27}
B.aYO.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cWM(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.ciO())switch(w.cx.a){case 0:w.cy=D.OZ
break
case 1:w.cy=D.P_
break
case 3:w.cy=D.P0
break
case 5:w.cy=D.OX
break
case 6:w.cy=D.OY
break
case 7:w.cy=D.vf
break
default:break}},
$S:35}
B.aYP.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cWN(w.iceGatheringState)},
$S:35}
B.aYQ.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cYZ(w.signalingState)},
$S:35}
B.aYR.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cY7(w.connectionState)},
$S:35}
B.aYS.prototype={
$1(d){},
$S:35}
B.aYT.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.cf7(d.track)
x=d.streams
x=y.l.b(x)?x:new A.da(x,A.W(x).i("da<1,aE>"))
w=J.ds(x,new B.aYL(w),y.h)
v.$1(new B.Vb(A.G(w,!0,w.$ti.i("aD.E"))))}},
$S:27}
B.aYL.prototype={
$1(d){return new B.us(d,this.a.as)},
$S:z+7}
B.caR.prototype={
$1(d){return J.ha(self.window.navigator.userAgent,A.bE(d,!1,!1))},
$S:8}
B.aYZ.prototype={
$1(d){var x,w,v,u,t
for(x=this.a,w=x.at,v=w.length,u=0;u<w.length;w.length===v||(0,A.R)(w),++u)w[u].X(0)
C.b.a1(w)
t=self.document.createElement("video")
t.autoplay=!0
t.muted=!0
t.controls=!1
t.srcObject=x.x
t.id="video_"+("RTCVideoRenderer-"+x.Q)
t.setAttribute("playsinline","true")
x.adS(t)
v=y.k.c
w.push(A.iN(t,"canplay",new B.aYV(x),!1,v))
w.push(A.iN(t,"resize",new B.aYW(x),!1,v))
w.push(A.iN(t,"error",new B.aYX(t),!1,v))
w.push(A.iN(t,"ended",new B.aYY(),!1,v))
return t},
$S:180}
B.aYV.prototype={
$1(d){this.a.aok()},
$S:22}
B.aYW.prototype={
$1(d){this.a.aok()},
$S:22}
B.aYX.prototype={
$1(d){var x,w,v=this.a.error
A.oY("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.K2.h(0,A.ax(v,"code"))
x.toString
w=!J.r(A.ax(v,"message"),"")?A.ax(v,"message"):"No further diagnostic information can be determined or provided."
throw A.o(A.oi(x,C.K1.h(0,A.ax(v,"code")),w,null))},
$S:26}
B.aYY.prototype={
$1(d){},
$S:22}
B.aZ_.prototype={
$0(){},
$S:0}
B.aZ1.prototype={
$0(){var x=this.a.a
return x.c.as=x.e},
$S:0}
B.aZ0.prototype={
$2(d,e){var x=null,w=this.a.a.c
if(w.z!=null)w=A.abC("RTCVideoRenderer-"+w.Q)
else w=A.S(x,x,C.j,x,x,x,x,x,x,x,x,x,x,x)
return A.cz(A.S(x,w,C.j,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:1217}
B.aMm.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.fM(w.gim(w),new B.aMl(v),w.gpt())},
$S:0}
B.aMl.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.akt()
x=x.b
x===$&&A.d()
x.aa(0)},
$S:0}
B.bA1.prototype={
$1(d){},
$S:17}
B.aCj.prototype={
$1(d){this.a.cI(0,this.b)},
$S:27}
B.aCk.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hB(new B.MB("Failed to connect WebSocket"))
else this.b.afl(1006,"error")},
$S:27}
B.aCl.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cE("data")
if(typeof x==="string")w.b=new B.M0(A.br(x))
else if(typeof x==="object"&&A.cnL(y.m.a(x),"ArrayBuffer"))w.b=new B.Hf(A.U3(y.o.a(x),0,null))
else throw A.o(A.am("unexpected message type: "+J.aI(x).l(0)))
v.F(0,w.bl())},
$S:26}
B.aCm.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cI(0,this.b)
this.b.afl(d.code,d.reason)},
$S:27}
B.axT.prototype={
$1(d){var x=d.b,w=this.a
new A.cP(x,A.x(x).i("cP<1>")).cR(new B.axQ(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cP(x,A.x(x).i("cP<1>")).bnC(new B.axR(d),new B.axS(w,d))
w.f.dS(0)},
$S:z+8}
B.axQ.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.M0
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.F(0,w)
break $label0$0}x=d instanceof B.Hf
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.F(0,v)
break $label0$0}if(d instanceof B.HH){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.aa(0)}}},
$S:z+9}
B.axR.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.ap(B.cgt())
s=A.cd(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.M.b(x)
if(t)v=x
if(t){this.a.abt(v)
break $label1$1}u=null
t=y.I.b(x)
if(t)u=x
if(t){this.a.abt(new Uint8Array(A.c2(u)))
break $label1$1}t=A.aV("Cannot send "+J.aI(d).l(0))
throw A.o(t)}}catch(r){if(!(A.N(r) instanceof B.MA))throw r}},
$S:18}
B.axS.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.z5(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.N(q) instanceof B.MA))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.axU.prototype={
$1(d){var x,w=d instanceof A.XT?d:new B.aiP(J.l(d)),v=this.a
v.f.hB(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.i5(w)
v=v.a
v===$&&A.d()
v.aa(0)},
$S:35};(function aliases(){var x=B.Ih.prototype
x.aBC=x.aa
x=B.a5P.prototype
x.aFr=x.m})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u
x(B.a_F.prototype,"gaHE","GQ",0)
var v
w(v=B.a_E.prototype,"gaoc","aod",2)
x(v,"gala","Jk",0)
x(v,"galx","aly",1)
x(v,"gae5","Q2",0)
x(v,"gae4","Q1",0)
x(v,"gae3","PZ",0)
x(v,"gapg","bcT",1)
x(v,"gakC","b2i",1)
w(v=B.a8P.prototype,"gb5f","b5g",6)
x(v,"gb3G","a3C",1)
x(B.Vc.prototype,"gec","m",0)
x(B.Vf.prototype,"gb1q","b1r",1)})();(function inheritance(){var x=a.mixinHard,w=a.inheritMany,v=a.inherit
w(A.ac,[B.Ih,B.aA1,B.LC,B.a92,B.b31,B.a8P,B.acJ,B.aYJ,B.TC,B.JT,B.aTi,B.V9,B.Va,B.aYU,B.aht,B.a0y,B.ahs,B.Br,B.vp,B.MB,B.aiP,B.KJ,B.Ey,B.Vb,B.Vd])
v(B.WR,A.h6)
w(A.kp,[B.b3E,B.c9E,B.buX,B.buU,B.buV,B.buR,B.buS,B.buT,B.buO,B.buP,B.buW,B.buA,B.buy,B.buB,B.buC,B.bux,B.buh,B.bui,B.buk,B.bug,B.bul,B.bum,B.buf,B.buu,B.buv,B.bue,B.bud,B.buc,B.bur,B.bus,B.aDN,B.aTl,B.aTm,B.aZ_,B.aZ1,B.aMm,B.aMl,B.axS])
w(A.jP,[B.b3F,B.c9F,B.aA2,B.buY,B.buQ,B.buz,B.buD,B.buE,B.buF,B.buj,B.bun,B.buo,B.bup,B.buH,B.buI,B.buJ,B.buK,B.buL,B.buM,B.buw,B.buG,B.buq,B.but,B.b32,B.b33,B.b34,B.aDM,B.caI,B.aTz,B.aTA,B.aTw,B.aTx,B.aTy,B.aTn,B.aYM,B.aYN,B.aYO,B.aYP,B.aYQ,B.aYR,B.aYS,B.aYT,B.aYL,B.caR,B.aYZ,B.aYV,B.aYW,B.aYX,B.aYY,B.bA1,B.aCj,B.aCk,B.aCl,B.aCm,B.axT,B.axQ,B.axR,B.axU])
w(A.T,[B.qR,B.qQ,B.NP,B.Ve])
w(A.Y,[B.a_F,B.a_E,B.a5P,B.Vf])
w(A.aw,[B.Z6,B.akv,B.Z7,B.A4])
w(A.tC,[B.buN,B.bQB,B.aTk,B.aZ0])
v(B.ap8,B.a5P)
v(B.aYK,B.aYJ)
v(B.us,B.TC)
v(B.adc,B.JT)
v(B.aTj,B.aTi)
v(B.af4,B.V9)
v(B.af5,B.Va)
v(B.cfN,B.aYU)
v(B.Vc,A.dv)
w(B.aht,[B.abl,B.axP])
w(B.vp,[B.M0,B.Hf,B.HH])
v(B.MA,B.MB)
v(B.aun,B.Ih)
w(A.N7,[B.z8,B.V8,B.z7,B.oo,B.af6])
x(B.a5P,A.h4)})()
A.oQ(b.typeUniverse,JSON.parse('{"Ih":{"e7":["1"]},"WR":{"h6":["1","2"],"h6.S":"1","h6.T":"2"},"NP":{"T":[],"q":[]},"qR":{"T":[],"q":[]},"a_F":{"Y":["qR"]},"Z6":{"aw":[],"q":[]},"qQ":{"T":[],"q":[]},"a_E":{"Y":["qQ"]},"akv":{"aw":[],"q":[]},"Z7":{"aw":[],"q":[]},"A4":{"aw":[],"q":[]},"ap8":{"Y":["NP"]},"us":{"TC":[]},"adc":{"JT":[]},"af4":{"V9":[]},"af5":{"Va":[]},"Vc":{"dv":["Vd"],"b1":[]},"Ve":{"T":[],"q":[]},"Vf":{"Y":["Ve"]},"a0y":{"e7":["1"]},"Br":{"cgs":[]},"M0":{"vp":[]},"Hf":{"vp":[]},"HH":{"vp":[]},"MB":{"bK":[]},"MA":{"bK":[]},"aun":{"e7":["@"]},"aiP":{"bK":[]}}'))
A.cs7(b.typeUniverse,JSON.parse('{"Ih":1,"aht":1}'))
var y=(function rtii(){var x=A.aA
return{b:x("Br"),L:x("bK"),_:x("av<@>"),x:x("av<~>"),S:x("H<ag<p,V>>"),t:x("H<ag<p,@>>"),Q:x("H<JT>"),d:x("H<jw<@>>"),s:x("H<p>"),p:x("H<q>"),m:x("aE"),l:x("F<aE>"),F:x("F<ag<p,@>>"),j:x("F<@>"),I:x("F<v>"),P:x("ag<p,@>"),f:x("ag<@,@>"),E:x("TC"),G:x("JT"),h:x("us"),o:x("ra"),a:x("bz"),K:x("ac"),J:x("V9"),e:x("Va"),v:x("Ey"),Z:x("ahs<ac?>"),N:x("p"),i:x("rK"),M:x("e4"),D:x("vp"),U:x("X<p>"),g:x("dT<LC>"),n:x("dT<~>"),V:x("bf<Br>"),r:x("bf<@>"),R:x("bf<~>"),k:x("a_P<aE>"),C:x("qb<aE>"),u:x("aC<Br>"),c:x("aC<@>"),W:x("aC<~>"),q:x("kQ"),y:x("V"),z:x("@"),A:x("aE?"),X:x("ac?"),H:x("~")}})();(function constants(){var x=a.makeConstList
D.zH=new A.a_(1,0.10588235294117647,0.17254901960784313,0.25098039215686274,C.w)
D.ZH=new B.a92(C.h8)
D.rO=new A.al(32,0,32,0)
D.a3k=new A.al(8,20,8,20)
D.a3C=new A.cR(1,C.ar,C.w6,null)
D.BI=new A.ao(57639,"MaterialIcons",null,!1)
D.a4L=new A.ao(58337,"MaterialIcons",null,!1)
D.a4M=new A.ao(58341,"MaterialIcons",null,!1)
D.BS=new A.ao(59048,"MaterialIcons",null,!1)
D.a4Q=new A.ao(59049,"MaterialIcons",null,!1)
D.a4R=new A.ao(59077,"MaterialIcons",null,!1)
D.BN=new A.ao(58195,"MaterialIcons",null,!1)
D.a6Q=new A.aa(D.BN,null,C.m,null,null)
D.a6P=new A.aa(D.BN,28,C.m,null,null)
D.a4P=new A.ao(58923,"MaterialIcons",null,!1)
D.a75=new A.aa(D.a4P,null,C.m,null,null)
D.agr=A.a(x([1,2,4,8,16]),A.aA("H<v>"))
D.am0=A.a(x([]),y.Q)
D.Kh=new A.h3("FlutterWebRTC.Method",C.bk,null)
D.avZ=new B.oo(0,"RTCIceConnectionStateNew")
D.aw_=new B.oo(1,"RTCIceConnectionStateChecking")
D.aw0=new B.oo(2,"RTCIceConnectionStateCompleted")
D.aw1=new B.oo(3,"RTCIceConnectionStateConnected")
D.aw2=new B.oo(4,"RTCIceConnectionStateCount")
D.OU=new B.oo(5,"RTCIceConnectionStateFailed")
D.aw3=new B.oo(6,"RTCIceConnectionStateDisconnected")
D.OV=new B.oo(7,"RTCIceConnectionStateClosed")
D.OW=new B.V8(0,"RTCIceGatheringStateNew")
D.aw4=new B.V8(1,"RTCIceGatheringStateGathering")
D.aw5=new B.V8(2,"RTCIceGatheringStateComplete")
D.vf=new B.z7(0,"RTCPeerConnectionStateClosed")
D.OX=new B.z7(1,"RTCPeerConnectionStateFailed")
D.OY=new B.z7(2,"RTCPeerConnectionStateDisconnected")
D.OZ=new B.z7(3,"RTCPeerConnectionStateNew")
D.P_=new B.z7(4,"RTCPeerConnectionStateConnecting")
D.P0=new B.z7(5,"RTCPeerConnectionStateConnected")
D.aw6=new B.z8(0,"RTCSignalingStateStable")
D.aw7=new B.z8(1,"RTCSignalingStateHaveLocalOffer")
D.aw8=new B.z8(2,"RTCSignalingStateHaveRemoteOffer")
D.aw9=new B.z8(3,"RTCSignalingStateHaveLocalPrAnswer")
D.awa=new B.z8(4,"RTCSignalingStateHaveRemotePrAnswer")
D.P1=new B.z8(5,"RTCSignalingStateClosed")
D.awb=new B.Vd(0,0,0)
D.vg=new B.af6(0,"RTCVideoViewObjectFitContain")
D.P2=new B.af6(1,"RTCVideoViewObjectFitCover")
D.azV=new A.cj(48,null,null,null)
D.aA7=new A.cj(null,64,null,null)
D.aD6=new A.D(!0,C.m,null,null,null,null,26,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.aDk=new A.D(!0,C.o,null,null,null,null,40,C.A,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
D.wx=new A.D(!0,C.am,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.chs=null
$.cr9=!1
$.cpg=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"d3Y","cj2",()=>new B.aYK())
x($,"d0A","ciO",()=>C.d.t(A.ax(A.ax(A.ax(A.cis(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_1",e:"endPart",h:b})})($__dart_deferred_initializers__,"bLh07jkm6il1oc6lSlbj6WSLySQ=");