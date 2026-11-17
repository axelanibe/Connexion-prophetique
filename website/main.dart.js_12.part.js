((a,b,c)=>{a[b]=a[b]||{}
a[b][c]=a[b][c]||[]
a[b][c].push({p:"main.dart.js_12",e:"beginPart"})})(self,"$__dart_deferred_initializers__","eventLog")
$__dart_deferred_initializers__.current=function(a,b,c,$){var J,A,D,B={CN:function CN(){},Pi:function Pi(d){this.$ti=d},aNA:function aNA(d){this.a=d},aNB:function aNB(d,e){this.a=d
this.b=e},
Zf(d){var x,w,v,u,t,s=new B.anb(),r=J.P(d),q=r.h(d,"id")
q=J.l(q==null?"":q)
x=r.h(d,"conversation_id")
J.l(x==null?"":x)
x=r.h(d,"appelant_id")
x=J.l(x==null?"":x)
w=r.h(d,"appelant_nom")
w=J.l(w==null?"":w)
v=A.aT(r.h(d,"appele_id"))
A.aT(r.h(d,"appele_nom"))
u=r.h(d,"type")
u=J.l(u==null?"audio":u)
t=r.h(d,"statut")
t=J.l(t==null?"sonne":t)
s.$1(r.h(d,"cree_le"))
s.$1(r.h(d,"repondu_le"))
return new B.ana(q,x,w,v,u,t)},
bR9(d){var x,w,v,u=J.P(d),t=u.h(d,"contenu"),s=u.h(d,"id")
s=J.l(s==null?"":s)
x=u.h(d,"appel_id")
J.l(x==null?"":x)
x=u.h(d,"emetteur_id")
x=J.l(x==null?"":x)
w=u.h(d,"type")
w=J.l(w==null?"":w)
if(y.P.b(t))v=t
else v=y.f.b(t)?J.lY(t,y.N,y.z):D.fj
if(u.h(d,"cree_le")!=null)A.c5(J.l(u.h(d,"cree_le")))
return new B.Fq(s,x,w,v)},
c0S(d){var x,w,v,u,t,s,r=J.P(d),q=r.h(d,"iceServers")
if(q==null)q=r.h(d,"ice_servers")
if(!y.j.b(q))return C.Tl
x=A.b([],y.t)
for(r=J.ao(q),w=y.f,v=y.P,u=y.N,t=y.z;r.A();){s=r.gK(r)
if(v.b(s))x.push(s)
else if(w.b(s))x.push(J.lY(s,u,t))}return new B.a_J(x)},
bE0(d){var x=D.h.bb(d.a,1e6)
return D.c.b0(D.h.j(D.h.bb(x,60)),2,"0")+":"+D.c.b0(D.h.j(D.h.aQ(x,60)),2,"0")},
bVR(d){var x=J.P(d),w=x.h(d,"sdp"),v=x.h(d,"type")
if(typeof w!="string"||w.length===0)return null
x=J.od(v)
if(!x.l(v,"offer")&&!x.l(v,"answer"))return null
return new A.aeS(w,v)},
ce4(d){var x,w,v=J.P(d),u=v.h(d,"candidate")
if(typeof u!="string")return null
x=v.h(d,"sdpMid")
w=v.h(d,"sdpMLineIndex")
v=typeof x=="string"?x:null
return new A.aeV(u,A.ke(w)?w:null,v)},
ana:function ana(d,e,f,g,h,i){var _=this
_.a=d
_.c=e
_.d=f
_.e=g
_.r=h
_.w=i},
anb:function anb(){},
Fq:function Fq(d,e,f,g){var _=this
_.a=d
_.c=e
_.d=f
_.e=g},
a_J:function a_J(d){this.a=d},
bOj(d,e,f,g,h,i){return new B.oH(e,f,i,h,d,null)},
bOi(d,e,f,g,h){return new B.xR(e,h,f,g,d,null)},
bSj(d,e,f,g,h,i,j,k,l,m,n){return new B.a9w(g,f,e,i,h,d,m,l,k,j,n,null)},
oH:function oH(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.r=g
_.w=h
_.a=i},
Su:function Su(){var _=this
_.d=!0
_.f=_.e=!1
_.c=_.a=_.x=_.w=_.r=null},
b7x:function b7x(d){this.a=d},
b7y:function b7y(d){this.a=d},
b7u:function b7u(d){this.a=d},
b7v:function b7v(d){this.a=d},
b7r:function b7r(d){this.a=d},
b7s:function b7s(d){this.a=d},
b7t:function b7t(d){this.a=d},
b7o:function b7o(d){this.a=d},
b7p:function b7p(d){this.a=d},
b7q:function b7q(d){this.a=d},
b7w:function b7w(d){this.a=d},
Rc:function Rc(d,e,f,g,h){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.a=h},
xR:function xR(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
St:function St(d,e){var _=this
_.e=_.d=$
_.f=d
_.r=null
_.Q=_.z=_.y=_.x=_.w=!1
_.as=!0
_.at=null
_.ax=e
_.c=_.a=_.cy=_.cx=_.CW=_.ch=_.ay=null},
b78:function b78(d){this.a=d},
b79:function b79(d){this.a=d},
b77:function b77(){},
b7a:function b7a(d){this.a=d},
b7b:function b7b(d){this.a=d},
b7c:function b7c(d){this.a=d},
b7d:function b7d(d){this.a=d},
b76:function b76(d,e){this.a=d
this.b=e},
b7e:function b7e(){},
b7f:function b7f(d){this.a=d},
b7h:function b7h(d){this.a=d},
b7i:function b7i(d){this.a=d},
b7j:function b7j(d){this.a=d},
b7k:function b7k(d){this.a=d},
b7l:function b7l(d){this.a=d},
b7m:function b7m(d){this.a=d},
b7g:function b7g(d){this.a=d},
b75:function b75(d,e){this.a=d
this.b=e},
b74:function b74(d,e){this.a=d
this.b=e},
b73:function b73(d,e){this.a=d
this.b=e},
b7n:function b7n(d){this.a=d},
a9w:function a9w(d,e,f,g,h,i,j,k,l,m,n,o){var _=this
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
vZ:function vZ(d,e,f,g,h,i){var _=this
_.c=d
_.d=e
_.e=f
_.f=g
_.r=h
_.a=i},
aN_:function aN_(d,e){var _=this
_.c=_.b=_.a=null
_.d=d
_.e=e
_.w=_.r=_.f=null
_.y=_.x=!1},
aN0:function aN0(d){this.a=d},
aN1:function aN1(d){this.a=d},
aN2:function aN2(d){this.a=d},
a_t:function a_t(d,e){var _=this
_.d=_.c=_.b=null
_.e=!1
_.f=0
_.r=d
_.w=e
_.x=null},
aq0:function aq0(d){this.a=d},
aq1:function aq1(d){this.a=d},
bEU(d){var x=y.U,w=A.I(new A.Y(A.b(d.split(" "),y.s),new B.bEV(),x),!0,x.i("t.E"))
x=w.length
if(x===0)return"?"
if(x===1)return J.q(D.b.gS(w),0).toUpperCase()
return(J.q(D.b.gS(w),0)+J.q(D.b.gaG(w),0)).toUpperCase()},
bEV:function bEV(){},
aIn:function aIn(){},
mn:function mn(d,e,f){this.e=d
this.a=e
this.b=f},
aDb:function aDb(d){this.a=d},
aDc:function aDc(d){this.a=d},
bIk(d){var x=new B.a3a(d)
x.ata(d)
return x},
a3a:function a3a(d){this.d=d},
aD8:function aD8(d){this.a=d},
aD9:function aD9(d){this.a=d},
aDa:function aDa(d){this.a=d},
aCY:function aCY(){},
aD_:function aD_(){},
aD0:function aD0(){},
aD1:function aD1(d){this.a=d},
aCZ:function aCZ(d){this.a=d},
c5w(d,e){var x=y.N
x=new B.a4G(d,e,A.C(x,y.E),A.C(x,y.z))
x.atg(d,e)
return x},
a4G:function a4G(d,e,f,g){var _=this
_.as=d
_.at=e
_.ax=f
_.ay=g
_.Q=_.e=_.d=_.cy=_.cx=_.CW=_.ch=null},
aIq:function aIq(d){this.a=d},
aIr:function aIr(d){this.a=d},
aIs:function aIs(d){this.a=d},
aIt:function aIt(d){this.a=d},
aIu:function aIu(d){this.a=d},
aIv:function aIv(d){this.a=d},
aIw:function aIw(d){this.a=d},
aIx:function aIx(d){this.a=d},
aIo:function aIo(d){this.a=d},
aIp:function aIp(d,e){this.a=d
this.b=e},
bIR:function bIR(d){this.a=d},
cfS(){return D.b.mL(A.b(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone","OpenHarmony"],y.s),new B.bF2())!==-1},
bF2:function bF2(){},
a1o:function a1o(d){this.a=d},
c4A(){var x=new B.aGi()
x.ate()
return x},
aGi:function aGi(){},
aGj:function aGj(d){this.a=d},
bQB(){var x=A.b([],y.d),w=$.bQC
$.bQC=w+1
return new B.NU(w,x,C.agP,$.af())},
NU:function NU(d,e,f,g){var _=this
_.z=_.y=_.x=_.w=null
_.Q=d
_.as=!1
_.at=e
_.ax="contain"
_.a=f
_.fy$=0
_.go$=g
_.k1$=_.id$=0},
aIz:function aIz(d,e){this.a=d
this.b=e},
aIA:function aIA(d,e){this.a=d
this.b=e},
aIB:function aIB(d){this.a=d},
aIC:function aIC(){},
bQD(d,e,f){return new B.NW(d,f,e,null)},
bSw(d,e){if("requestVideoFrameCallback" in d)return d.requestVideoFrameCallback(e)
else return self.window.requestAnimationFrame(A.bS(new B.bcd(e,d)))},
NW:function NW(d,e,f,g){var _=this
_.c=d
_.d=e
_.e=f
_.a=g},
NX:function NX(){var _=this
_.c=_.a=_.w=_.r=_.f=_.e=_.d=null},
aID:function aID(){},
aII:function aII(d,e){this.a=d
this.b=e},
aIJ:function aIJ(d){this.a=d},
aIG:function aIG(d,e){this.a=d
this.b=e},
aIH:function aIH(d){this.a=d},
aIE:function aIE(d){this.a=d},
aIF:function aIF(d){this.a=d},
bcd:function bcd(d,e){this.a=d
this.b=e},
ac1:function ac1(d,e,f){this.b=d
this.c=e
this.a=f},
bOQ(d,e,f,g){var x,w={}
w.a=d
x=new B.a1H(g.i("a1H<0>"))
x.at1(e,f,w,g)
return x},
a1H:function a1H(d){var _=this
_.b=_.a=$
_.c=null
_.d=!1
_.$ti=d},
awE:function awE(d,e){this.a=d
this.b=e},
awD:function awD(d){this.a=d},
Tj:function Tj(d,e,f,g,h){var _=this
_.a=d
_.b=e
_.c=f
_.e=_.d=!1
_.r=_.f=null
_.w=g
_.$ti=h},
bcc:function bcc(){},
a6P:function a6P(d){this.b=this.a=$
this.$ti=d},
a6Q:function a6Q(){},
bH6(d,e){return B.c0a(d,e)},
c0a(d,e){var x=0,w=A.k(y.b),v,u,t,s,r,q,p
var $async$bH6=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:if(!d.nJ("ws")&&!d.nJ("wss"))throw A.n(A.ff(d,"url","only ws: and wss: schemes are supported"))
u=self
t=u.WebSocket
s=d.j(0)
u=new u.Array()
r=new t(s,u)
r.binaryType="arraybuffer"
q=new B.xd(r,A.fV(null,null,null,!1,y.D))
u=new A.av($.aK,y.u)
p=new A.b3(u,y.V)
if(J.p(r.readyState,1))p.cP(0,q)
else if(J.p(r.readyState,2)||J.p(r.readyState,3))p.hC(new B.Gf("Unexpected WebSocket state: "+A.r(r.readyState)+", expected CONNECTING (0) or OPEN (1)"))
else new A.o2(r,"open",!1,y.C).gS(0).aE(new B.aoW(p,q),y.H)
t=y.C
s=y.H
new A.o2(r,"error",!1,t).gS(0).aE(new B.aoX(p,q),s)
A.mQ(r,"message",new B.aoY(q),!1,y.m)
new A.o2(r,"close",!1,t).gS(0).aE(new B.aoZ(p,q),s)
v=u
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$bH6,w)},
xd:function xd(d,e){this.a=d
this.b=e},
aoW:function aoW(d,e){this.a=d
this.b=e},
aoX:function aoX(d,e){this.a=d
this.b=e},
aoY:function aoY(d){this.a=d},
aoZ:function aoZ(d,e){this.a=d
this.b=e},
bJr(){return new B.Ge("Connection Closed")},
rJ:function rJ(){},
FO:function FO(d){this.a=d},
C0:function C0(d){this.a=d},
Cp:function Cp(d,e){this.a=d
this.b=e},
Gf:function Gf(d){this.a=d},
Ge:function Ge(d){this.a=d},
c_H(d){var x=null,w=$.aK,v=new B.a6P(y.Z),u=y.X,t=A.fV(x,x,x,!0,u),s=A.fV(x,x,x,!0,u),r=A.u(s),q=A.u(t)
v.a=B.bOQ(new A.cE(s,r.i("cE<1>")),new A.Bh(t,q.i("Bh<1>")),!0,u)
v.b=B.bOQ(new A.cE(t,q.i("cE<1>")),new A.Bh(s,r.i("Bh<1>")),!1,u)
v=new B.alr(new A.b3(new A.av(w,y.W),y.T),v)
v.asT(d)
return v},
alr:function alr(d,e){var _=this
_.e=_.d=null
_.f=d
_.r=e
_.w=$},
alv:function alv(d){this.a=d},
als:function als(d){this.a=d},
alt:function alt(d){this.a=d},
alu:function alu(d,e){this.a=d
this.b=e},
alw:function alw(d){this.a=d},
ait:function ait(d,e){this.b=d
this.a=e},
a7W:function a7W(d){this.a=d},
cft(d){switch(d){case"new":return C.agC
case"checking":return C.agD
case"connected":return C.agF
case"completed":return C.agE
case"failed":return C.JM
case"disconnected":return C.agH
case"closed":return C.JN
case"count":return C.agG}return C.JN},
cfu(d){switch(d){case"new":return C.JO
case"gathering":return C.agI
case"complete":return C.agJ}return C.JO},
cgV(d){switch(d){case"stable":return C.agK
case"have-local-offer":return C.agL
case"have-local-pranswer":return C.agN
case"have-remote-offer":return C.agM
case"have-remote-pranswer":return C.agO
case"closed":return C.JU}return C.JU},
cgx(d){switch(d){case"new":return C.JR
case"connecting":return C.JS
case"connected":return C.JT
case"closed":return C.rv
case"disconnected":return C.JQ
case"failed":return C.JP}return C.rv},
vh:function vh(d,e){this.a=d
this.b=e},
NR:function NR(d,e){this.a=d
this.b=e},
vg:function vg(d,e){this.a=d
this.b=e},
my:function my(d,e){this.a=d
this.b=e},
a4H:function a4H(d,e){this.a=d
this.b=e},
aIm:function aIm(){},
Mv:function Mv(){},
E0:function E0(){},
aCX:function aCX(){},
EG:function EG(d,e,f){this.a=d
this.b=e
this.c=f},
NS:function NS(){},
aIy:function aIy(){},
zE:function zE(d,e){this.a=d
this.b=e},
NT:function NT(d){this.b=d},
NV:function NV(d,e,f){this.a=d
this.b=e
this.c=f},
bI1(d){var x=0,w=A.k(y.y)
var $async$bI1=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:if(d.d.kind!=="video")throw A.n("The is not a video track => "+d.j(0))
throw A.n("You need to specify the deviceId")
return A.i(null,w)}})
return A.j($async$bI1,w)},
aGg(d){var x=0,w=A.k(y.H),v
var $async$aGg=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v=y.z
x=2
return A.e(B.aRf("enableSpeakerphone",A.a8(["enable",d],y.N,v),v,v),$async$aGg)
case 2:return A.i(null,w)}})
return A.j($async$aGg,w)},
aRf(d,e,f,g){return B.c85(d,e,f,g,f.i("0?"))},
c85(d,e,f,g,h){var x=0,w=A.k(h),v
var $async$aRf=A.f(function(i,j){if(i===1)return A.h(j,w)
while(true)switch(x){case 0:$.bXo()
x=3
return A.e(B.aRe(A.a8(["logSeverity","none"],y.N,y.z)),$async$aRf)
case 3:v=C.Fv.cw(d,e,!1,f)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$aRf,w)},
aRe(d){var x=0,w=A.k(y.H)
var $async$aRe=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=!$.bSa?2:3
break
case 2:x=4
return A.e(C.Fv.cw("initialize",A.a8(["options",d],y.N,y.z),!1,y.H),$async$aRe)
case 4:$.bSa=!0
case 3:return A.i(null,w)}})
return A.j($async$aRe,w)}},C,E
J=c[1]
A=c[0]
D=c[2]
B=a.updateHolder(c[5],B)
C=c[28]
E=c[20]
B.CN.prototype={
E(d,e){this.a.E(0,e)},
cZ(d,e){this.a.cZ(d,e)},
a6(d){return this.a.a6(0)},
$idB:1}
B.Pi.prototype={
iG(d){var x=A.cC("subscription"),w=A.fV(new B.aNA(x),null,null,!0,this.$ti.y[1])
x.b=d.eH(new B.aNB(this,w),w.glM(w),w.gnl())
return new A.cE(w,A.u(w).i("cE<1>"))}}
B.ana.prototype={}
B.Fq.prototype={}
B.a_J.prototype={}
B.oH.prototype={
O(){return new B.Su()}}
B.Su.prototype={
U(){var x=this
x.V()
x.J5()
x.r=A.de(D.c_,new B.b7x(x))
x.w=A.kP(C.WE,new B.b7y(x))},
k(){var x=this,w=x.r
if(w!=null)w.a2(0)
w=x.w
if(w!=null)w.a2(0)
w=x.x
if(w!=null)w.a2(0)
x.a5()},
Vk(){var x=this.x
if(x!=null)x.a2(0)
this.x=A.de(D.fU,new B.b7u(this))},
Mt(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Mt=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.e||s.f){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.zD(p.c),$async$Mt)
case 7:r=e
q=B.Zf(r)
if(s.c==null||s.e){x=1
break}if(q.w!=="sonne"){s.n(new B.b7v(s))
p=s.r
if(p!=null)p.a2(0)
p=s.w
if(p!=null)p.a2(0)
s.Vk()}u=2
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
return A.j($async$Mt,w)},
J5(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k
var $async$J5=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
o=s.a
o.toString
n=$.a7()
x=7
return A.e(n.zD(o.c),$async$J5)
case 7:r=e
q=B.Zf(r)
if(s.c==null){x=1
break}m=s.a.r
if(m==null)m=n.gaik()
p=m
if(q.w!=="sonne"||q.c===p){s.n(new B.b7r(s))
s.Vk()
x=1
break}s.n(new B.b7s(s))
u=2
x=6
break
case 4:u=3
k=t
if(s.c==null){x=1
break}s.n(new B.b7t(s))
s.Vk()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$J5,w)},
IW(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$IW=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.f||s.e){x=1
break}s.n(new B.b7o(s))
u=4
q=s.a
q.toString
p=$.a7()
x=7
return A.e(p.YZ(q.c,"accepte"),$async$IW)
case 7:u=2
x=6
break
case 4:u=3
n=t
r=A.O(n)
if(s.c==null){x=1
break}s.n(new B.b7p(s))
q=s.c
q.toString
p=J.l(r)
q.u(y.q).f.B(A.B(null,null,null,null,null,D.f,null,A.c(p,null,null,null,null,null,null,null,null),null,D.m,null,null,null,null,null,null,null,null,null))
x=1
break
x=6
break
case 3:x=2
break
case 6:if(s.c==null){x=1
break}q=s.r
if(q!=null)q.a2(0)
q=s.w
if(q!=null)q.a2(0)
q=s.c
q.toString
A.ab(q,!1).ww(A.ef(new B.b7q(s),null,y.z))
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$IW,w)},
C9(d){return this.aMZ(d)},
auM(){return this.C9(!1)},
aMZ(d){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$C9=A.f(function(e,f){if(e===1){t=f
x=u}while(true)switch(x){case 0:if(s.f){x=1
break}s.f=!0
r=s.r
if(r!=null)r.a2(0)
r=s.w
if(r!=null)r.a2(0)
u=4
r=s.a
r.toString
q=$.a7()
x=7
return A.e(q.YZ(r.c,"refuse"),$async$C9)
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
if(r!=null)A.ab(r,!1).bJ()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$C9,w)},
C(d){var x,w,v,u,t=this,s=null,r=t.a,q=r.e
r=A.oz(D.u,s,A.c(B.bEU(r.d),s,s,s,s,C.M1,s,s,s),s,56)
x=t.a.d
x=A.c(x.length===0?A.a("Un membre"):x,s,s,s,s,C.LX,D.a2,s,s)
if(t.d)q=A.a("Connexion\u2026")
else if(t.e)q=A.a("Appel termin\xe9")
else q=q==="video"?A.a("Appel vid\xe9o entrant"):A.a("Appel entrant")
w=y.p
q=A.b([r,D.az,new A.a1(C.xo,x,s),D.j,A.c(q,s,s,s,s,C.tz,s,s,s),C.Lm],w)
if(!t.d&&!t.e){r=A.a("Refuser")
x=t.f?s:new B.b7w(t)
v=A.a("Accepter")
u=t.f?s:t.gatU()
q.push(A.a0(A.b([new B.Rc(C.y8,D.k2,r,x,s),C.akd,new B.Rc(C.y7,C.adi,v,u,s)],w),D.o,D.bS,D.i,s))}if(t.d)q.push(E.vH)
return A.f0(s,D.n,A.hd(!0,A.cN(A.M(q,D.o,D.e,D.U),s,s),!0,D.aj,!0,!0),s,s)}}
B.Rc.prototype={
C(d){var x=this,w=null,v=A.di(x.d,w,w,D.aj,D.cs,w)
return A.M(A.b([A.aa(A.b4(!1,A.cc(x.c,D.l,w,32),D.k,w,D.q,w,w,w,w,x.f,w,v),72,72),D.j,A.c(x.e,w,w,w,w,D.eL,w,w,w)],y.p),D.o,D.e,D.U)}}
B.xR.prototype={
O(){return new B.St(A.b_(y.N),D.a3)}}
B.St.prototype={
U(){var x,w,v=this,u=null
v.V()
v.a.toString
x=B.bQB()
w=B.bQB()
v.d!==$&&A.bi()
v.d=new B.aN_(x,w)
v.a.toString
x=new B.a_t(new A.er(u,u,y.R),new A.er(u,u,y.n))
v.e!==$&&A.bi()
v.e=x
v.uB()},
k(){var x=this,w=x.ay
if(w!=null)w.a2(0)
w=x.ch
if(w!=null)w.a2(0)
w=x.CW
if(w!=null)w.a2(0)
w=x.cx
if(w!=null)w.a2(0)
w=x.cy
if(w!=null)w.a2(0)
w=x.d
w===$&&A.d()
w.wh()
w=x.e
w===$&&A.d()
w.Fu()
x.a5()},
uB(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i
var $async$uB=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:u=4
m=s.a
m.toString
l=$.a7()
x=7
return A.e(l.zD(m.c),$async$uB)
case 7:r=e
q=B.Zf(r)
if(s.c==null){x=1
break}m=q.w
if(m==="termine"||m==="expire"){s.mm(A.a("Appel termin\xe9"))
x=1
break}s.r=s.a.f?q.c:q.e
x=8
return A.e(l.O0(),$async$uB)
case 8:p=e
o=B.c0S(p)
x=9
return A.e(s.So(),$async$uB)
case 9:if(!e){m=s.c
if(m!=null){l=s.a.d==="video"?A.a("Autorise le micro et la cam\xe9ra pour appeler en vid\xe9o."):A.a("Autorise le micro pour appeler.")
m.u(y.q).f.B(A.B(null,null,null,null,null,D.f,null,A.c(l,null,null,null,null,null,null,null,null),null,D.m,null,null,null,null,null,null,null,null,null))}s.mm(null)
x=1
break}m=s.d
m===$&&A.d()
k=s.a.d
x=10
return A.e(m.tP(A.a8(["iceServers",o.a],y.N,y.z),k==="video"),$async$uB)
case 10:m.f=new B.b78(s)
m.r=new B.b79(s)
m.w=new B.b7a(s)
if(s.c==null){x=1
break}s.n(new B.b7b(s))
s.ch=A.de(D.c_,new B.b7c(s))
s.CW=A.kP(D.cS,new B.b7d(s))
m=s.e
m===$&&A.d()
k=m.r
s.cx=new A.cH(k,A.u(k).i("cH<1>")).cM(s.gaRF())
k=m.w
s.cy=new A.cH(k,A.u(k).i("cH<1>")).cM(new B.b7e())
s.a.toString
n=l.b
if(n!=null&&J.a4(n)!==0){s.a.toString
m.Na(D.c.Qa("https://connexion-prophetique.onrender.com","https://","wss://")+"/messagerie/ws?jeton="+A.f3(D.c9,n,D.ai,!0))}s.ay=A.kP(D.fU,new B.b7f(s))
s.Df()
u=2
x=6
break
case 4:u=3
i=t
m=s.c
if(m==null){x=1
break}l=A.a("Impossible de d\xe9marrer l\u2019appel. V\xe9rifie ta connexion, puis r\xe9essaie.")
m.u(y.q).f.B(A.B(null,null,null,null,null,D.f,null,A.c(l,null,null,null,null,null,null,null,null),null,D.m,null,null,null,null,null,null,null,null,null))
s.mm(null)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$uB,w)},
So(){var x=0,w=A.k(y.y),v
var $async$So=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:v=!0
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$So,w)},
Df(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m
var $async$Df=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.c==null||s.x){x=1
break}u=4
p=s.a
p.toString
o=$.a7()
x=7
return A.e(o.bW("/messagerie/appels/"+p.c+"/signaux"),$async$Df)
case 7:r=e
for(p=J.ao(r);p.A();){q=p.gK(p)
s.acC(B.bR9(q))}u=2
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
return A.j($async$Df,w)},
acC(d){var x,w,v,u,t,s=this
if(s.c==null||s.x)return
x=s.f
w=d.a
if(x.q(0,w))return
x.E(0,w)
x=s.r
if(x!=null&&d.c===x)return
switch(d.d){case"offre":if(s.a.f)return
v=B.bVR(d.e)
if(v==null)return
x=s.d
x===$&&A.d()
x.z8(A.a8(["sdp",v.a,"type",v.b],y.N,y.z)).aE(new B.b7h(s),y.a).hi(new B.b7i(s))
break
case"reponse":if(!s.a.f)return
u=B.bVR(d.e)
if(u==null)return
x=s.d
x===$&&A.d()
x.MR(A.a8(["sdp",u.a,"type",u.b],y.N,y.z)).aE(new B.b7j(s),y.a).hi(new B.b7k(s))
break
case"candidat_ice":t=B.ce4(d.e)
if(t==null)return
x=s.d
x===$&&A.d()
x.MN(A.a8(["candidate",t.a,"sdpMid",t.c,"sdpMLineIndex",t.b],y.N,y.z))
break
case"accepte":if(!s.a.f||s.w)return
x=s.d
x===$&&A.d()
x.Fo().aE(new B.b7l(s),y.a).hi(new B.b7m(s))
break
case"refuse":s.mm(A.a("Appel refus\xe9"))
break
case"annule":s.mm(A.a("Appel annul\xe9"))
break
case"termine":s.mm(A.a("Appel termin\xe9"))
break}},
a9Q(){var x,w=this
if(w.w)return
x=w.ch
if(x!=null)x.a2(0)
w.n(new B.b7g(w))},
xJ(d,e,f){return this.aAl(d,e,f)},
a6k(d,e){return this.xJ(d,e,!0)},
aAl(d,e,f){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p
var $async$xJ=A.f(function(g,h){if(g===1){u=h
x=v}while(true)switch(x){case 0:v=3
s=t.a
s.toString
r=$.a7()
x=6
return A.e(r.agn(s.c,e,d),$async$xJ)
case 6:v=1
x=5
break
case 3:v=2
p=u
if(f&&t.c!=null&&!t.x)t.mm(A.a("L\u2019appel n\u2019a pas pu aboutir."))
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$xJ,w)},
DJ(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o
var $async$DJ=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.x){x=1
break}s.x=!0
r=s.ch
if(r!=null)r.a2(0)
u=4
r=s.a
r.toString
q=$.a7()
x=7
return A.e(q.YZ(r.c,"termine"),$async$DJ)
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
if(r!=null)A.ab(r,!1).bJ()
case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$DJ,w)},
mm(d){var x,w=this,v=null
if(w.x)return
w.x=!0
x=w.ch
if(x!=null)x.a2(0)
if(d!=null&&w.c!=null)w.c.u(y.q).f.B(A.B(v,v,v,v,v,D.f,v,A.c(d,v,v,v,v,v,v,v,v),v,D.m,v,v,v,v,v,v,v,v,v))
x=w.c
if(x!=null)A.ab(x,!1).bJ()},
Jb(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Jb=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.z
t=v.d
t===$&&A.d()
x=2
return A.e(t.Ro(u),$async$Jb)
case 2:if(v.c!=null)v.n(new B.b75(v,u))
return A.i(null,w)}})
return A.j($async$Jb,w)},
Ja(){var x=0,w=A.k(y.H),v=this,u,t
var $async$Ja=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.Q
t=v.d
t===$&&A.d()
x=2
return A.e(t.Ie(u),$async$Ja)
case 2:if(v.c!=null)v.n(new B.b74(v,u))
return A.i(null,w)}})
return A.j($async$Ja,w)},
J8(){var x=0,w=A.k(y.H),v=this,u,t
var $async$J8=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=!v.as
t=v.d
t===$&&A.d()
x=2
return A.e(t.Rl(u),$async$J8)
case 2:if(v.c!=null)v.n(new B.b73(v,u))
return A.i(null,w)}})
return A.j($async$J8,w)},
J9(){var x=0,w=A.k(y.H),v=this,u
var $async$J9=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u=v.d
u===$&&A.d()
x=2
return A.e(u.MU(),$async$J9)
case 2:return A.i(null,w)}})
return A.j($async$J9,w)},
C(d){var x,w,v,u,t,s,r=this,q=null,p="Connexion\u2026",o=r.d
o===$&&A.d()
x=o.c
w=r.a
if(w.d==="video"&&r.y){if(x!=null)x=B.bQD(o.e,!1,C.JW)
else{x=A.oz(D.u,q,A.c(B.bEU(w.e),q,q,q,q,C.aoD,q,q,q),q,48)
w=A.c(r.a.e,q,q,q,q,C.an1,q,q,q)
x=A.cN(A.M(A.b([x,D.p,w,D.j,A.c(r.w?B.bE0(r.ax):A.a(p),q,q,q,q,C.tz,q,q,q)],y.p),D.o,D.e,D.U),q,q)}x=A.Ex(0,x)
o=A.ly(q,A.fo(A.Q(12),B.bQD(o.d,!0,C.JW),D.as),160,q,q,16,16,110)
w=r.w
v=B.bE0(r.ax)
u=r.z
t=r.Q
u=A.fG(D.bl,A.b([x,o,A.ly(24,B.bSj(r.as,v,w,!0,t,u,r.ga3Y(),r.ga3X(),r.ga3Z(),r.ga4_(),r.gaa6()),q,q,0,0,q,q)],y.p),D.f,D.bq,q)
o=u}else{o=A.oz(D.u,q,A.c(B.bEU(w.e),q,q,q,q,C.M1,q,q,q),q,56)
x=A.c(r.a.e,q,q,q,q,C.LX,D.a2,q,q)
if(r.w)w=B.bE0(r.ax)
else w=r.y?A.a("Appel en cours\u2026"):A.a(p)
w=A.c(w,q,q,q,q,C.tz,q,q,q)
v=r.w
u=B.bE0(r.ax)
t=r.z
s=r.Q
t=A.cN(A.M(A.b([o,D.az,new A.a1(C.xo,x,q),D.j,w,C.Lm,B.bSj(r.as,u,v,!1,s,t,r.ga3Y(),r.ga3X(),r.ga3Z(),r.ga4_(),r.gaa6())],y.p),D.o,D.e,D.U),q,q)
o=t}return A.bQl(!1,A.f0(q,D.n,A.hd(!0,o,!0,D.aj,!0,!0),q,q),new B.b7n(r),y.K)}}
B.a9w.prototype={
C(d){var x,w,v=this,u=null,t=y.p,s=A.b([],t),r=v.d
if(r&&v.c)s.push(A.c(v.e,u,u,u,u,C.anP,u,u,u))
if(r&&v.c)s.push(D.p)
r=v.f
x=r?C.YG:C.YF
t=A.b([new B.vZ(x,r,A.a("Muet"),v.x,u,u),C.nv,new B.vZ(C.YP,v.r,A.a("Haut-parleur"),v.y,u,u)],t)
r=v.c
if(r)t.push(C.nv)
if(r){x=v.w
w=x?C.yd:C.YO
t.push(new B.vZ(w,!x,A.a("Cam\xe9ra"),v.z,u,u))}if(r)t.push(C.nv)
if(r)t.push(new B.vZ(C.YN,!1,A.a("Basculer"),v.Q,u,u))
t.push(C.nv)
t.push(new B.vZ(C.y8,!1,A.a("Raccrocher"),v.as,D.k2,u))
s.push(A.a0(t,D.o,D.bS,D.i,u))
return A.M(s,D.o,D.e,D.U)}}
B.vZ.prototype={
C(d){var x,w=this,v=null,u=w.r,t=u==null
if(t)u=w.d?D.l:D.lc
if(!t)x=D.l
else x=w.d?D.n:D.l
t=A.di(u,v,v,D.aj,D.cs,v)
return A.M(A.b([A.aa(A.b4(!1,A.cc(w.c,x,v,26),D.k,v,D.q,v,v,v,v,w.f,v,t),56,56),D.b5,A.c(w.e,v,v,v,v,C.anQ,v,v,v)],y.p),D.o,D.e,D.U)}}
B.aN_.prototype={
tP(d,e){return this.b3A(d,e)},
b3A(d,e){var x=0,w=A.k(y.H),v=this,u,t,s,r,q,p,o
var $async$tP=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:o=v.d
x=2
return A.e(o.lR(0),$async$tP)
case 2:x=3
return A.e(v.e.lR(0),$async$tP)
case 3:u=$.bXx()
if(e){t=y.N
t=A.a8(["facingMode","user"],t,t)}else t=!1
s=y.N
r=y.z
x=4
return A.e(new B.aCY().Br(0,A.a8(["audio",!0,"video",t],s,r)),$async$tP)
case 4:q=v.b=g
o.sa28(0,q)
x=5
return A.e(u.Yd(d,A.C(s,r)),$async$tP)
case 5:p=v.a=g
x=6
return A.e(p.ke(0,q),$async$tP)
case 6:p.e=new B.aN0(v)
p.Q=new B.aN1(v)
p.d=new B.aN2(v)
return A.i(null,w)}})
return A.j($async$tP,w)},
ayS(d){var x,w=this
w.c=d
if(!w.x){w.x=!0
w.e.sa28(0,d)
x=w.r
if(x!=null)x.$0()}},
Fo(){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$Fo=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.al("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.Nm(0),$async$Fo)
case 3:t=e
x=4
return A.e(s.BF(0,t),$async$Fo)
case 4:v=A.a8(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Fo,w)},
z8(d){return this.aWC(d)},
aWC(d){var x=0,w=A.k(y.P),v,u=this,t,s
var $async$z8=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.a
if(s==null)throw A.n(A.al("Connexion non pr\xe9par\xe9e."))
x=3
return A.e(s.BH(0,new B.zE(d.h(0,"sdp"),d.h(0,"type"))),$async$z8)
case 3:x=4
return A.e(s.Nk(0),$async$z8)
case 4:t=f
x=5
return A.e(s.BF(0,t),$async$z8)
case 5:v=A.a8(["sdp",t.a,"type",t.b],y.N,y.z)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$z8,w)},
MR(d){return this.aTS(d)},
aTS(d){var x=0,w=A.k(y.H),v=this,u
var $async$MR=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
if(u==null)throw A.n(A.al("Connexion non pr\xe9par\xe9e."))
x=2
return A.e(u.BH(0,new B.zE(d.h(0,"sdp"),d.h(0,"type"))),$async$MR)
case 2:return A.i(null,w)}})
return A.j($async$MR,w)},
MN(d){return this.aTE(d)},
aTE(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$MN=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.a
if(t==null){x=1
break}x=3
return A.e(t.MD(new B.EG(A.aT(d.h(0,"candidate")),A.aT(d.h(0,"sdpMid")),A.e4(d.h(0,"sdpMLineIndex")))),$async$MN)
case 3:case 1:return A.i(v,w)}})
return A.j($async$MN,w)},
Ro(d){return this.amU(d)},
amU(d){var x=0,w=A.k(y.H),v=this,u,t,s,r
var $async$Ro=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:r=v.b
r=r==null?null:r.QV(0)
if(r==null)r=D.dg
u=r.length
t=!d
s=0
for(;s<r.length;r.length===u||(0,A.J)(r),++s)r[s].ski(0,t)
return A.i(null,w)}})
return A.j($async$Ro,w)},
Ie(d){return this.amL(d)},
amL(d){var x=0,w=A.k(y.H)
var $async$Ie=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:x=2
return A.e(B.aGg(d),$async$Ie)
case 2:return A.i(null,w)}})
return A.j($async$Ie,w)},
Rl(d){return this.amD(d)},
amD(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$Rl=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=v.b
s=s==null?null:s.HZ(0)
if(s==null)s=D.dg
u=s.length
t=0
for(;t<s.length;s.length===u||(0,A.J)(s),++t)s[t].ski(0,d)
return A.i(null,w)}})
return A.j($async$Rl,w)},
MU(){var x=0,w=A.k(y.H),v,u=this,t,s
var $async$MU=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:t=u.b
s=t==null?null:t.HZ(0)
if(s==null)s=C.a9k
if(s.length===0){x=1
break}x=3
return A.e(B.bI1(D.b.gS(s)),$async$MU)
case 3:case 1:return A.i(v,w)}})
return A.j($async$MU,w)},
wh(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$wh=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.y){x=1
break}s.y=!0
u=4
q=s.a
q=q==null?null:q.a6(0)
x=7
return A.e(y.x.b(q)?q:A.dJ(q,y.H),$async$wh)
case 7:u=2
x=6
break
case 4:u=3
i=t
x=6
break
case 3:x=2
break
case 6:s.a=null
q=s.b
if(q==null)q=null
else{o=A.I(q.QV(0),!0,y.G)
D.b.t(o,q.HZ(0))
q=o}if(q==null)q=D.dg
o=q.length
n=y.c
m=y._
l=0
case 8:if(!(l<q.length)){x=10
break}r=q[l]
u=12
k=J.c_z(r)
if(!m.b(k)){j=new A.av($.aK,n)
j.a=8
j.c=k
k=j}x=15
return A.e(k,$async$wh)
case 15:u=2
x=14
break
case 12:u=11
h=t
x=14
break
case 11:x=2
break
case 14:case 9:q.length===o||(0,A.J)(q),++l
x=8
break
case 10:s.b=null
u=17
x=20
return A.e(s.d.k(),$async$wh)
case 20:u=2
x=19
break
case 17:u=16
g=t
x=19
break
case 16:x=2
break
case 19:u=22
x=25
return A.e(s.e.k(),$async$wh)
case 25:u=2
x=24
break
case 22:u=21
f=t
x=24
break
case 21:x=2
break
case 24:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$wh,w)}}
B.a_t.prototype={
Na(d){return this.aV7(d)},
aV7(d){var x=0,w=A.k(y.H),v=this
var $async$Na=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.x=d
v.e=!1
v.f=0
x=2
return A.e(v.Ca(),$async$Na)
case 2:return A.i(null,w)}})
return A.j($async$Na,w)},
Ca(){var x=0,w=A.k(y.H),v,u=2,t,s=this,r,q,p,o,n
var $async$Ca=A.f(function(d,e){if(d===1){t=e
x=u}while(true)switch(x){case 0:if(s.e){x=1
break}r=s.x
if(r==null||J.a4(r)===0){x=1
break}u=4
q=B.c_H(B.bH6(A.cO(r,0,null),null))
s.b=q
x=7
return A.e(q.f.a,$async$Ca)
case 7:s.f=0
p=q.r.b
p===$&&A.d()
p=p.b
p===$&&A.d()
s.c=new A.cE(p,A.u(p).i("cE<1>")).aP(s.gaMN(),!0,s.gaLW(),new B.aq0(s))
u=2
x=6
break
case 4:u=3
n=t
s.Vb()
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Ca,w)},
aMO(d){var x,w,v,u
try{x=D.a0.d1(0,J.l(d),null)
v=y.P
if(!v.b(x))return
if(!J.p(J.q(x,"type"),"signal_appel"))return
w=J.q(x,"signal")
if(!v.b(w))return
v=this.r
if((v.c&4)===0)v.E(0,B.bR9(w))}catch(u){}},
Vb(){var x,w=this,v=w.c
if(v!=null)v.a2(0)
w.b=w.c=null
if(w.e)return
v=w.f
if(v>=5){v=w.w
if((v.c&4)===0)v.E(0,null)
return}x=C.a5A[v]
w.f=v+1
v=w.d
if(v!=null)v.a2(0)
w.d=A.de(A.ds(0,0,0,0,x),new B.aq1(w))},
Fu(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o
var $async$Fu=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:t.e=!0
s=t.d
if(s!=null)s.a2(0)
s=t.c
s=s==null?null:s.a2(0)
x=2
return A.e(y.x.b(s)?s:A.dJ(s,y.H),$async$Fu)
case 2:t.c=null
v=4
s=t.b
if(s==null)s=null
else{r=s.w
if(r===$){q=s.r.b
q===$&&A.d()
q=q.a
q===$&&A.d()
r!==$&&A.aV()
r=s.w=new B.ait(s,q)}s=r.a6(0)}x=7
return A.e(y._.b(s)?s:A.dJ(s,y.z),$async$Fu)
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
return A.j($async$Fu,w)}}
B.aIn.prototype={
Yd(d,e){return this.aWu(d,e)},
aWu(d,e){var x=0,w=A.k(y.M),v,u,t,s,r
var $async$Yd=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:r=e.a
if(r!==0)u=e
else{r=y.z
t=y.N
u=A.a8(["mandatory",A.C(r,r),"optional",A.b([A.a8(["DtlsSrtpKeyAgreement",!0],t,y.y)],y.S)],t,y.K)}r=self.RTCPeerConnection
t=A.fA(u,y.N,y.z)
t.t(0,d)
s=new r(y.m.a(A.bQ(t)))
t=J.l(s)
v=B.c5w(D.d5.glP().bt(new A.eI(t)),s)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Yd,w)}}
B.mn.prototype={
QV(d){var x=A.b([],y.Q),w=this.e.getAudioTracks()
w=y.l.b(w)?w:new A.dd(w,A.X(w).i("dd<1,aB>"))
J.h_(w,new B.aDb(x))
return x},
HZ(d){var x=A.b([],y.Q),w=this.e.getVideoTracks()
w=y.l.b(w)?w:new A.dd(w,A.X(w).i("dd<1,aB>"))
J.h_(w,new B.aDc(x))
return x}}
B.a3a.prototype={
ata(d){var x=this,w=x.d
w.addEventListener("ended",A.bS(new B.aD8(x)))
w.addEventListener("mute",A.bS(new B.aD9(x)))
w.addEventListener("unmute",A.bS(new B.aDa(x)))},
ski(d,e){this.d.enabled=e},
aV(d){var x=0,w=A.k(y.H),v=this
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.d.stop()
return A.i(null,w)}})
return A.j($async$aV,w)}}
B.aCY.prototype={
Br(d,e){return this.alQ(0,e)},
alQ(d,e){var x=0,w=A.k(y.E),v,u=2,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
var $async$Br=A.f(function(a1,a2){if(a1===1){t=a2
x=u}while(true)switch(x){case 0:u=4
try{if(!B.cfS())if(y.f.b(e.h(0,"video"))&&J.q(e.h(0,"video"),"facingMode")!=null)J.ir(e.h(0,"video"),"facingMode")
e.cl(0,"video",new B.aD_())
e.cl(0,"audio",new B.aD0())}catch(a0){A.n2("[getUserMedia] failed to remove facingMode from mediaConstraints")}try{if(y.P.b(e.h(0,"audio"))){i=y.z
i=A.hR(e.h(0,"audio"),i,i).aO(0,"optional")&&y.F.b(J.q(e.h(0,"audio"),"optional"))}else i=!1
if(i){s=J.q(e.h(0,"audio"),"optional")
r=A.C(y.N,y.z)
J.h_(s,new B.aD1(r))
J.ir(e.h(0,"audio"),"optional")
J.iT(e.h(0,"audio"),r)}}catch(a0){q=A.O(a0)
p=A.bd(a0)
A.n2("[getUserMedia] failed to translate optional audio constraints, "+A.r(q)+", "+A.r(p))}i=self
o=i.window.navigator.mediaDevices
h=y.m
x=o.getUserMedia!=null?7:9
break
case 7:n=A.bQ(e)
x=10
return A.e(A.eG(o.getUserMedia(h.a(n)),h),$async$Br)
case 10:m=a2
i=m
h=i.id
v=new B.mn(i,h,"local")
x=1
break
x=8
break
case 9:i=i.window.navigator.mediaDevices
g=e.h(0,"audio")
x=11
return A.e(A.eG(i.getUserMedia({video:e.h(0,"video"),audio:g}),h),$async$Br)
case 11:l=a2
h=l
g=h.id
v=new B.mn(h,g,"local")
x=1
break
case 8:u=2
x=6
break
case 4:u=3
f=t
k=A.O(f)
i=J.l(k)
throw A.n("Unable to getUserMedia: "+i)
x=6
break
case 3:x=2
break
case 6:case 1:return A.i(v,w)
case 2:return A.h(t,w)}})
return A.j($async$Br,w)}}
B.a4G.prototype={
atg(d,e){var x=this,w=x.at
w===$&&A.d()
w.addEventListener("datachannel",A.bS(new B.aIq(x)))
w.addEventListener("icecandidate",A.bS(new B.aIr(x)))
w.addEventListener("iceconnectionstatechange",A.bS(new B.aIs(x)))
w.onicegatheringstatechange=A.bS(new B.aIt(x))
w.addEventListener("signalingstatechange",A.bS(new B.aIu(x)))
if(!$.bLi())w.addEventListener("connectionstatechange",A.bS(new B.aIv(x)))
w.addEventListener("negotiationneeded",A.bS(new B.aIw(x)))
w.addEventListener("track",A.bS(new B.aIx(x)))},
Nm(d){var x=0,w=A.k(y.g),v,u=this,t,s
var $async$Nm=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eG(s.createOffer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$Nm)
case 3:t=f
v=new B.zE(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Nm,w)},
Nk(d){var x=0,w=A.k(y.g),v,u=this,t,s
var $async$Nk=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:s=u.at
s===$&&A.d()
x=3
return A.e(A.eG(s.createAnswer(y.m.a(A.bQ(A.C(y.N,y.z)))),y.A),$async$Nk)
case 3:t=f
v=new B.zE(t.sdp,t.type)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$Nk,w)},
ke(d,e){var x
this.ax.cl(0,e.a,new B.aIp(this,e))
x=this.at
x===$&&A.d()
x.addStream(e.e)
return A.cR(null,y.H)},
BF(d,e){return this.amP(0,e)},
amP(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BF=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eG(u.setLocalDescription({type:e.b,sdp:e.a}),y.X),$async$BF)
case 2:return A.i(null,w)}})
return A.j($async$BF,w)},
BH(d,e){return this.an3(0,e)},
an3(d,e){var x=0,w=A.k(y.H),v=this,u
var $async$BH=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:u=v.at
u===$&&A.d()
x=2
return A.e(A.eG(u.setRemoteDescription({type:e.b,sdp:e.a}),y.X),$async$BH)
case 2:return A.i(null,w)}})
return A.j($async$BH,w)},
MD(d){return this.aTl(d)},
aTl(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$MD=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=v.at
t===$&&A.d()
u=d.b
u.toString
x=2
return A.e(A.eG(t.addIceCandidate({candidate:d.a,sdpMid:u,sdpMLineIndex:d.c}),y.X),$async$MD)
case 2:return A.i(null,w)}})
return A.j($async$MD,w)},
a6(d){var x=0,w=A.k(y.H),v,u=this,t
var $async$a6=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:t=u.at
t===$&&A.d()
t.close()
v=A.cR(null,y.H)
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$a6,w)}}
B.bIR.prototype={
aV(d){var x=0,w=A.k(y.H),v=this,u,t,s
var $async$aV=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:try{v.a.stop()}catch(r){s=A.O(r)
if(y.L.b(s)){u=s
s=u
J.l(s)
throw A.n("Unable to RTCRtpTransceiver::stop: "+A.r(s))}else throw r}return A.i(null,w)}})
return A.j($async$aV,w)}}
B.a1o.prototype={
Z2(d){var x=0,w=A.k(y.H),v=this
var $async$Z2=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:v.a.E(0,A.a8([A.bx(J.q(d,"event")),d],y.N,y.z))
return A.i(null,w)}})
return A.j($async$Z2,w)},
aYb(d){if(y.L.b(d))throw A.n(d)}}
B.aGi.prototype={
ate(){var x=$.bWH().a
new A.cH(x,A.u(x).i("cH<1>")).cM(new B.aGj(this))},
jQ(d,e){return this.aZs(d,e)},
aZs(d,e){var x=0,w=A.k(y.H)
var $async$jQ=A.f(function(f,g){if(f===1)return A.h(g,w)
while(true)switch(x){case 0:switch(J.q(e,"event")){case"onLogData":break}return A.i(null,w)}})
return A.j($async$jQ,w)}}
B.NU.prototype={
saiq(d){var x,w
this.as=d
x=this.zQ()
if(x!=null){x=x.style
w=d?"scaleX(-1)":""
x.transform=w}},
saiz(d,e){var x
if(this.ax===e)return
this.ax=e
x=this.zQ()
if(x!=null)x.style.objectFit=e},
acL(d){var x,w,v=this,u=v.zQ()
if(u==null)u=d
x=v.a
w=u.videoWidth
v.sm(0,x.aft(u.videoHeight,v.z!=null,0,w))},
sa28(d,e){var x,w,v,u,t=this
t.z=e
if(e.HZ(0).length!==0){t.x=new self.MediaStream()
x=t.z.e.getVideoTracks()
x=J.ao(y.l.b(x)?x:new A.dd(x,A.X(x).i("dd<1,aB>")))
for(;x.A();){w=x.gK(x)
t.x.addTrack(w)}}if(e.QV(0).length!==0){t.y=new self.MediaStream()
x=t.z.e.getAudioTracks()
x=J.ao(y.l.b(x)?x:new A.dd(x,A.X(x).i("dd<1,aB>")))
for(;x.A();){w=x.gK(x)
t.y.addTrack(w)}}if(t.y!=null){if(t.w==null){v=self.document.createElement("audio")
v.id="audio_"+("RTCVideoRenderer-"+t.Q)
v.muted=e.b==="local"
v.autoplay=!0
t.w=v
x=t.aA9()
w=t.w
w.toString
x.append(w)}x=t.w
if(x!=null)x.srcObject=t.y}u=t.zQ()
if(u!=null){u.srcObject=t.x
x=t.zQ()
x.toString
t.a3N(x)}t.sm(0,t.a.aVt(t.z!=null))},
aA9(){var x,w=self,v=w.document.getElementById("html_webrtc_audio_manager_list")
if(v!=null)return v
x=w.document.createElement("div")
x.id="html_webrtc_audio_manager_list"
x.style.display="none"
w=w.document.body
if(w!=null)w.append(x)
return x},
zQ(){var x=self.document.getElementById("video_"+("RTCVideoRenderer-"+this.Q))
if(x!=null)return x
return null},
k(){var x=0,w=A.k(y.H),v,u=this,t,s,r,q,p
var $async$k=A.f(function(d,e){if(d===1)return A.h(e,w)
while(true)switch(x){case 0:u.z=null
for(t=u.at,s=t.length,r=0;r<t.length;t.length===s||(0,A.J)(t),++r)t[r].a2(0)
q=u.zQ()
t=q==null
if(!t)q.removeAttribute("src")
if(!t)q.load()
s=u.w
if(s!=null)s.remove()
p=self.document.getElementById("html_webrtc_audio_manager_list")
if(p!=null&&!p.hasChildNodes())p.remove()
if(!t)q.remove()
v=u.el()
x=1
break
case 1:return A.i(v,w)}})
return A.j($async$k,w)},
dg(d){var x,w,v,u,t=this
for(x=t.at,w=x.length,v=0;v<x.length;x.length===w||(0,A.J)(x),++v)x[v].a2(0)
D.b.Y(x)
u=self.document.createElement("video")
u.autoplay=!0
u.muted=!0
u.controls=!1
u.srcObject=t.x
u.id="video_"+("RTCVideoRenderer-"+t.Q)
u.setAttribute("playsinline","true")
u.setAttribute("controlsList","nodownload nofullscreen noremoteplayback")
u.setAttribute("disablepictureinpicture","")
u.setAttribute("disableremoteplayback","")
u.setAttribute("x-webkit-airplay","deny")
t.a3N(u)
w=y.k.c
x.push(A.mQ(u,"canplay",new B.aIz(t,u),!1,w))
x.push(A.mQ(u,"resize",new B.aIA(t,u),!1,w))
x.push(A.mQ(u,"error",new B.aIB(u),!1,w))
x.push(A.mQ(u,"ended",new B.aIC(),!1,w))
return u},
lR(d){var x=0,w=A.k(y.H),v=this,u,t
var $async$lR=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.dg(0)
t=self
t.window.document.body.appendChild(u)
return A.i(null,w)}})
return A.j($async$lR,w)},
a3N(d){var x=d.style,w=this.as?"scaleX(-1)":""
x.transform=w
d.style.pointerEvents="none"
d.style.opacity="0"
d.style.position="absolute"
d.style.left="0px"
d.style.top="0px"}}
B.NW.prototype={
O(){return new B.NX()}}
B.NX.prototype={
U(){var x,w,v=this
v.V()
v.a.c.a8(0,v.gaKd())
x=v.a
x.c.saiq(x.e)
x=v.a
w=x.c
w.saiz(0,x.d===C.JV?"contain":"cover")
v.w=self.document.getElementById("video_"+("RTCVideoRenderer-"+v.a.c.Q))
v.Zp(0,0)},
aKe(){if(this.c!=null)this.n(new B.aID())},
Zp(d,e){var x=this,w=x.w
if(w!=null)if(w.readyState>2)x.N0(0).aE(new B.aII(x,w),y.a)
else x.d=B.bSw(w,A.I7(x.gagZ()))
else if(x.c!=null)A.kq(A.ds(0,0,100,0,0),null,y.z).aE(new B.aIJ(x),y.a)},
N0(d){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q,p,o,n,m
var $async$N0=A.f(function(e,f){if(e===1){u=f
x=v}while(true)switch(x){case 0:n=t.w
n.toString
s=n
n=t.f
p=s.currentTime
x=(n==null?p!=null:n!==p)?2:3
break
case 2:t.f=s.currentTime
v=5
n=s.videoWidth
p=s.videoHeight
n=$.aR().Y9(s,p,!0,n)
x=8
return A.e(y.e.b(n)?n:A.dJ(n,y.I),$async$N0)
case 8:r=f
if(t.c!=null)t.n(new B.aIG(t,r))
v=1
x=7
break
case 5:v=4
m=u
n=A.O(m)
if(y.m.b(n)){q=n
t.f=null
if(!J.p(q.name,"InvalidStateError"))throw m}else throw m
x=7
break
case 4:x=1
break
case 7:case 3:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$N0,w)},
k(){var x,w,v=this
if(v.c!=null)v.a5()
x=v.e
if(x!=null)x.k()
x=v.w
if(x!=null){w=v.d
if(w!=null)if("requestVideoFrameCallback" in x)x.cancelVideoFrameCallback(w)
else self.window.cancelAnimationFrame(w)}},
aU(d){var x,w
this.ba(d)
A.de(A.ds(0,0,10,0,0),new B.aIH(this))
x=this.a
w=x.c
w.saiz(0,x.d===C.JV?"contain":"cover")},
aUj(){return new A.kA(new B.aIE(this),null)},
C(d){return new A.kA(new B.aIF(this),null)}}
B.ac1.prototype={
aM(d,e){var x,w=this.b
if(this.c){d.qW(0,-1,1)
x=$.aR().b1()
x.sko(D.bB)
d.FD(0,w,new A.z(-e.a,0),x)}else{x=$.aR().b1()
x.sko(D.bB)
d.FD(0,w,new A.z(0,0),x)}},
eQ(d){return!1}}
B.a1H.prototype={
at1(d,e,f,g){var x=this,w=$.aK
x.a!==$&&A.bi()
x.a=new B.Tj(d,x,new A.b3(new A.av(w,y.c),y.r),e,g.i("Tj<0>"))
if(f.a.ghU())f.a=new B.Pi(g.i("@<0>").bP(g).i("Pi<1,2>")).iG(f.a)
w=A.fV(null,new B.awE(f,x),null,!0,g)
x.b!==$&&A.bi()
x.b=w},
a9s(){var x,w
this.d=!0
x=this.c
if(x!=null)x.a2(0)
w=this.b
w===$&&A.d()
w.a6(0)}}
B.Tj.prototype={
E(d,e){if(this.e)throw A.n(A.al("Cannot add event after closing."))
if(this.d)return
this.a.a.E(0,e)},
cZ(d,e){if(this.e)throw A.n(A.al("Cannot add event after closing."))
if(this.d)return
this.aCw(d,e)},
kY(d){return this.cZ(d,null)},
aCw(d,e){var x=this
if(x.w){x.a.a.cZ(d,e)
return}x.c.fg(d,e)
x.a9t()
x.b.a9s()
x.a.a.a6(0).hi(new B.bcc())},
a6(d){var x=this
if(x.e)return x.c.a
x.e=!0
if(!x.d){x.b.a9s()
x.c.cP(0,x.a.a.a6(0))}return x.c.a},
a9t(){this.d=!0
var x=this.c
if((x.a.a&30)===0)x.dM(0)
return},
$idB:1}
B.a6P.prototype={}
B.a6Q.prototype={}
B.xd.prototype={
a4X(d,e){var x=this.b
if((x.b&4)!==0)return
x.E(0,new B.Cp(d,e))
x.a6(0)},
a1K(d){var x
if((this.b.b&4)!==0)throw A.n(B.bJr())
x=A.bQ(d)
x.toString
this.a.send(x)},
vq(d,e,f){return this.aUS(0,e,f)},
aUS(d,e,f){var x=0,w=A.k(y.H),v=this,u
var $async$vq=A.f(function(g,h){if(g===1)return A.h(h,w)
while(true)switch(x){case 0:u=v.b
if((u.b&4)!==0)throw A.n(B.bJr())
u.a6(0)
v.a.close()
return A.i(null,w)}})
return A.j($async$vq,w)},
$ibJq:1}
B.rJ.prototype={}
B.FO.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.FO&&e.a===this.a},
gH(d){return D.c.gH(this.a)}}
B.C0.prototype={
l(d,e){var x,w,v,u
if(e==null)return!1
if(e instanceof B.C0&&e.a.length===this.a.length){for(x=this.a,w=x.length,v=e.a,u=0;u<w;++u)if(v[u]!==x[u])return!1
return!0}return!1},
gH(d){return A.fD(this.a)},
j(d){return"BinaryDataReceived("+A.r(this.a)+")"}}
B.Cp.prototype={
l(d,e){if(e==null)return!1
return e instanceof B.Cp&&e.a===this.a&&e.b===this.b},
gH(d){return A.fD([this.a,this.b])},
j(d){return"CloseReceived("+this.a+", "+this.b+")"}}
B.Gf.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketException"
else return"WebSocketException: "+x},
$ibM:1}
B.Ge.prototype={
j(d){var x=this.a
if(x.length===0)return"WebSocketConnectionClosed"
else return"WebSocketConnectionClosed: "+x}}
B.alr.prototype={
asT(d){d.ex(new B.alv(this),new B.alw(this),y.a)}}
B.ait.prototype={
a6(d){var x=this.b
x.e=x.d=null
return this.aoE(0)}}
B.a7W.prototype={
j(d){return"WebSocketChannelException: "+this.a},
$ibM:1}
B.vh.prototype={
M(){return"RTCSignalingState."+this.b}}
B.NR.prototype={
M(){return"RTCIceGatheringState."+this.b}}
B.vg.prototype={
M(){return"RTCPeerConnectionState."+this.b}}
B.my.prototype={
M(){return"RTCIceConnectionState."+this.b}}
B.a4H.prototype={
M(){return"RTCVideoViewObjectFit."+this.b}}
B.aIm.prototype={}
B.Mv.prototype={}
B.E0.prototype={
j(d){var x=this.d
return"Track(id: "+A.r(x.id)+", kind: "+A.r(x.kind)+", label: "+A.r(x.label)+", enabled: "+A.r(x.enabled)+", muted: "+A.r(x.muted)+")"}}
B.aCX.prototype={}
B.EG.prototype={}
B.NS.prototype={}
B.aIy.prototype={}
B.zE.prototype={}
B.NT.prototype={}
B.NV.prototype={
aft(d,e,f,g){var x=g==null?this.a:g,w=d==null?this.b:d,v=f==null?this.c:f
return new B.NV(x,w,v)},
aVt(d){return this.aft(null,d,null,null)},
j(d){var x=this
return A.a3(x).j(0)+"(width: "+A.r(x.a)+", height: "+A.r(x.b)+", rotation: "+x.c+")"}}
var z=a.updateTypes(["as<~>()","~(@)","~()","xR(H)","~(Fq)","bj(EG)","bj(NT)","bj(my)","mn(@)","mn()","~(Z)","~(Z,Z)","bj(bJq)","~(rJ)"])
B.aNA.prototype={
$0(){return J.c__(this.a.bk())},
$S:1}
B.aNB.prototype={
$1(d){var x,w,v,u
try{this.b.E(0,this.a.$ti.y[1].a(d))}catch(v){u=A.O(v)
if(y.i.b(u)){x=u
w=A.bd(v)
this.b.cZ(x,w)}else throw v}},
$S(){return this.a.$ti.i("~(1)")}}
B.anb.prototype={
$1(d){if(d==null)return null
return A.c5(J.l(d))},
$S:149}
B.b7x.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.e)x.C9(!0)},
$S:0}
B.b7y.prototype={
$1(d){return this.a.Mt()},
$S:38}
B.b7u.prototype={
$0(){var x=this.a.c
if(x!=null)A.ab(x,!1).bJ()},
$S:0}
B.b7v.prototype={
$0(){return this.a.e=!0},
$S:0}
B.b7r.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b7s.prototype={
$0(){return this.a.d=!1},
$S:0}
B.b7t.prototype={
$0(){var x=this.a
x.d=!1
x.e=!0},
$S:0}
B.b7o.prototype={
$0(){return this.a.f=!0},
$S:0}
B.b7p.prototype={
$0(){return this.a.f=!1},
$S:0}
B.b7q.prototype={
$1(d){var x=this.a.a,w=x.c,v=x.e,u=x.d
return B.bOi(x.w,w,u,!1,v)},
$S:z+3}
B.b7w.prototype={
$0(){return this.a.auM()},
$S:0}
B.b78.prototype={
$1(d){this.a.xJ("candidat_ice",d,!1)},
$S:216}
B.b79.prototype={
$0(){var x=this.a
if(x.c!=null)x.n(new B.b77())},
$S:0}
B.b77.prototype={
$0(){},
$S:0}
B.b7a.prototype={
$0(){this.a.mm(A.a("La connexion a \xe9t\xe9 perdue."))},
$S:0}
B.b7b.prototype={
$0(){return this.a.y=!0},
$S:0}
B.b7c.prototype={
$0(){var x=this.a
if(x.c!=null&&!x.w&&!x.x){if(x.a.f)x.xJ("annule",D.fj,!1)
x.mm(A.a("Pas de r\xe9ponse"))}},
$S:0}
B.b7d.prototype={
$1(d){var x=this.a,w=x.at
if(x.c!=null&&w!=null&&x.w)x.n(new B.b76(x,w))},
$S:38}
B.b76.prototype={
$0(){return this.a.ax=new A.aw(Date.now(),0,!1).eU(this.b)},
$S:0}
B.b7e.prototype={
$1(d){},
$S:138}
B.b7f.prototype={
$1(d){this.a.Df()},
$S:38}
B.b7h.prototype={
$1(d){var x=this.a
if(x.c==null||x.x)return
x.a9Q()
x.a6k("reponse",d)},
$S:358}
B.b7i.prototype={
$1(d){this.a.mm(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.b7j.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a9Q()},
$S:32}
B.b7k.prototype={
$1(d){this.a.mm(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.b7l.prototype={
$1(d){var x=this.a
if(x.c!=null&&!x.x)x.a6k("offre",d)},
$S:358}
B.b7m.prototype={
$1(d){this.a.mm(A.a("L\u2019appel n\u2019a pas pu aboutir."))},
$S:17}
B.b7g.prototype={
$0(){var x=this.a
x.w=!0
x.at=new A.aw(Date.now(),0,!1)
x.ax=D.a3},
$S:0}
B.b75.prototype={
$0(){return this.a.z=this.b},
$S:0}
B.b74.prototype={
$0(){return this.a.Q=this.b},
$S:0}
B.b73.prototype={
$0(){return this.a.as=this.b},
$S:0}
B.b7n.prototype={
$2(d,e){if(!d)this.a.DJ()},
$S:916}
B.aN0.prototype={
$1(d){var x,w=d.a
if(w.length===0)return
x=this.a.f
if(x!=null)x.$1(A.a8(["candidate",w,"sdpMid",d.b,"sdpMLineIndex",d.c],y.N,y.z))},
$S:z+5}
B.aN1.prototype={
$1(d){var x=d.b,w=x.length!==0?D.b.gS(x):null
if(w!=null)this.a.ayS(w)},
$S:z+6}
B.aN2.prototype={
$1(d){var x
if(d===C.JM){x=this.a.w
if(x!=null)x.$0()}},
$S:z+7}
B.aq0.prototype={
$1(d){return this.a.Vb()},
$S:26}
B.aq1.prototype={
$0(){var x=this.a
if(!x.e)x.Ca()},
$S:0}
B.bEV.prototype={
$1(d){return d.length!==0},
$S:12}
B.aDb.prototype={
$1(d){return this.a.push(B.bIk(d))},
$S:26}
B.aDc.prototype={
$1(d){return this.a.push(B.bIk(d))},
$S:26}
B.aD8.prototype={
$1(d){},
$S:21}
B.aD9.prototype={
$1(d){},
$S:21}
B.aDa.prototype={
$1(d){},
$S:21}
B.aD_.prototype={
$0(){return!1},
$S:45}
B.aD0.prototype={
$0(){return!1},
$S:45}
B.aD1.prototype={
$1(d){J.h_(d,new B.aCZ(this.a))},
$S:216}
B.aCZ.prototype={
$2(d,e){this.a.p(0,d,e)},
$S:49}
B.aIq.prototype={
$1(d){},
$S:21}
B.aIr.prototype={
$1(d){var x,w
if(d.candidate!=null){x=this.a.e
if(x!=null){w=d.candidate
x.$1(new B.EG(w.candidate,w.sdpMid,w.sdpMLineIndex))}}},
$S:21}
B.aIs.prototype={
$1(d){var x,w=this.a,v=w.at
v===$&&A.d()
v=B.cft(v.iceConnectionState)
w.cx=v
x=w.d
if(x!=null)x.$1(v)
if($.bLi())switch(w.cx.a){case 0:w.cy=C.JR
break
case 1:w.cy=C.JS
break
case 3:w.cy=C.JT
break
case 5:w.cy=C.JP
break
case 6:w.cy=C.JQ
break
case 7:w.cy=C.rv
break
default:break}},
$S:42}
B.aIt.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.CW=B.cfu(w.iceGatheringState)},
$S:42}
B.aIu.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.ch=B.cgV(w.signalingState)},
$S:42}
B.aIv.prototype={
$1(d){var x=this.a,w=x.at
w===$&&A.d()
x.cy=B.cgx(w.connectionState)},
$S:42}
B.aIw.prototype={
$1(d){},
$S:42}
B.aIx.prototype={
$1(d){var x,w=this.a,v=w.Q
if(v!=null){B.bIk(d.track)
x=d.streams
x=y.l.b(x)?x:new A.dd(x,A.X(x).i("dd<1,aB>"))
w=J.eW(x,new B.aIo(w),y.h)
v.$1(new B.NT(A.I(w,!0,w.$ti.i("aF.E"))))}},
$S:21}
B.aIo.prototype={
$1(d){return new B.mn(d,d.id,this.a.as)},
$S:z+8}
B.aIp.prototype={
$0(){var x=this.b.e
return new B.mn(x,x.id,this.a.as)},
$S:z+9}
B.bF2.prototype={
$1(d){return J.fJ(self.window.navigator.userAgent,A.bK(d,!1,!1))},
$S:12}
B.aGj.prototype={
$1(d){var x=J.ei(d),w=J.fK(x.gd4(d))
this.a.jQ(w,x.h(d,w))},
$S:216}
B.aIz.prototype={
$1(d){this.a.acL(this.b)},
$S:26}
B.aIA.prototype={
$1(d){this.a.acL(this.b)},
$S:26}
B.aIB.prototype={
$1(d){var x,w,v=this.a.error
A.n2("RTCVideoRenderer: videoElement.onError, "+J.l(v))
v.toString
x=C.acG.h(0,A.aj(v,"code"))
x.toString
w=!J.p(A.aj(v,"message"),"")?A.aj(v,"message"):"No further diagnostic information can be determined or provided."
throw A.n(A.pa(x,C.acF.h(0,A.aj(v,"code")),w,null))},
$S:40}
B.aIC.prototype={
$1(d){},
$S:26}
B.aID.prototype={
$0(){},
$S:0}
B.aII.prototype={
$1(d){var x=0,w=A.k(y.a),v=this,u
var $async$$1=A.f(function(e,f){if(e===1)return A.h(f,w)
while(true)switch(x){case 0:u=v.a
u.d=B.bSw(v.b,A.I7(u.gagZ()))
return A.i(null,w)}})
return A.j($async$$1,w)},
$S:917}
B.aIJ.prototype={
$1(d){this.a.Zp(0,0)},
$S:17}
B.aIG.prototype={
$0(){var x=this.a,w=x.e
if(w!=null)w.k()
x.e=this.b},
$S:0}
B.aIH.prototype={
$0(){var x=this.a.a,w=x.c
x=x.e
w.saiq(x)
return x},
$S:0}
B.aIE.prototype={
$2(d,e){var x,w,v,u,t,s=null,r=this.a
if(r.w!=null&&!J.p(r.r,new A.W(A.a2(1/0,e.a,e.b),A.a2(1/0,e.c,e.d)))){x=A.a2(1/0,e.a,e.b)
r.r=new A.W(x,A.a2(1/0,e.c,e.d))
w=r.w
if(w!=null){w.toString
w.width=D.d.G(x)
x=r.w
x.toString
x.height=D.d.G(r.r.b)}}x=A.b([],y.p)
w=r.e
if(w!=null){switch(r.a.d.a){case 0:v=D.j3
break
case 1:v=D.bX
break
default:v=s}w=w.gcX(w)
u=r.e
u=u.gbh(u)
t=r.e
t.toString
x.push(A.Ex(0,A.L4(D.a6,A.aa(A.hM(s,s,s,new B.ac1(t,r.a.e,s),D.ah,!0),u,w),D.f,v)))}return A.fG(D.bl,x,D.f,D.bq,s)},
$S:918}
B.aIF.prototype={
$2(d,e){var x=null,w=this.a
if(w.a.c.z!=null)w=w.aUj()
else w=A.V(x,x,D.k,x,x,x,x,x,x,x,x,x,x,x)
return A.cN(A.V(x,w,D.k,x,x,x,x,e.d,x,x,x,x,x,e.b),x,x)},
$S:919}
B.bcd.prototype={
$1(d){this.a.call(this.b,0,0)},
$S:920}
B.awE.prototype={
$0(){var x,w,v=this.b
if(v.d)return
x=this.a.a
w=v.b
w===$&&A.d()
v.c=x.eH(w.ghA(w),new B.awD(v),w.gnl())},
$S:0}
B.awD.prototype={
$0(){var x=this.a,w=x.a
w===$&&A.d()
w.a9t()
x=x.b
x===$&&A.d()
x.a6(0)},
$S:0}
B.bcc.prototype={
$1(d){},
$S:17}
B.aoW.prototype={
$1(d){this.a.cP(0,this.b)},
$S:21}
B.aoX.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.hC(new B.Gf("Failed to connect WebSocket"))
else this.b.a4X(1006,"error")},
$S:21}
B.aoY.prototype={
$1(d){var x,w,v=this.a.b
if((v.b&4)!==0)return
x=d.data
x.toString
w=A.cC("data")
if(typeof x==="string")w.b=new B.FO(A.bx(x))
else if(typeof x==="object"&&A.c3C(y.m.a(x),"ArrayBuffer"))w.b=new B.C0(A.a3x(y.o.a(x),0,null))
else throw A.n(A.al("unexpected message type: "+J.az(x).j(0)))
v.E(0,w.bk())},
$S:40}
B.aoZ.prototype={
$1(d){var x=this.a
if((x.a.a&30)===0)x.cP(0,this.b)
this.b.a4X(d.code,d.reason)},
$S:21}
B.alv.prototype={
$1(d){var x=d.b,w=this.a
new A.cE(x,A.u(x).i("cE<1>")).cM(new B.als(w))
x=w.r.a
x===$&&A.d()
x=x.b
x===$&&A.d()
new A.cE(x,A.u(x).i("cE<1>")).b0R(new B.alt(d),new B.alu(w,d))
w.f.dM(0)},
$S:z+12}
B.als.prototype={
$1(d){var x,w,v
$label0$0:{x=d instanceof B.FO
w=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,w)
break $label0$0}x=d instanceof B.C0
v=x?d.a:null
if(x){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.E(0,v)
break $label0$0}if(d instanceof B.Cp){x=this.a.r.a
x===$&&A.d()
x=x.a
x===$&&A.d()
x.a6(0)}}},
$S:z+13}
B.alt.prototype={
$1(d){var x,w,v,u,t,s,r
try{$label1$1:{x=d
w=null
t=typeof x=="string"
if(t)w=x
if(t){t=this.a
s=w
if((t.b.b&4)!==0)A.an(B.bJr())
s=A.bQ(s)
s.toString
t.a.send(s)
break $label1$1}v=null
t=y.O.b(x)
if(t)v=x
if(t){this.a.a1K(v)
break $label1$1}u=null
t=y.J.b(x)
if(t)u=x
if(t){this.a.a1K(new Uint8Array(A.dC(u)))
break $label1$1}t=A.aL("Cannot send "+J.az(d).j(0))
throw A.n(t)}}catch(r){if(!(A.O(r) instanceof B.Ge))throw r}},
$S:18}
B.alu.prototype={
$0(){var x=0,w=A.k(y.H),v=1,u,t=this,s,r,q
var $async$$0=A.f(function(d,e){if(d===1){u=e
x=v}while(true)switch(x){case 0:v=3
s=t.a
x=6
return A.e(t.b.vq(0,s.d,s.e),$async$$0)
case 6:v=1
x=5
break
case 3:v=2
q=u
if(!(A.O(q) instanceof B.Ge))throw q
x=5
break
case 2:x=1
break
case 5:return A.i(null,w)
case 1:return A.h(u,w)}})
return A.j($async$$0,w)},
$S:1}
B.alw.prototype={
$1(d){var x,w=d instanceof A.Qg?d:new B.a7W(J.l(d)),v=this.a
v.f.hC(w)
v=v.r.a
v===$&&A.d()
x=v.a
x===$&&A.d()
x.kY(w)
v=v.a
v===$&&A.d()
v.a6(0)},
$S:42};(function aliases(){var x=B.CN.prototype
x.aoE=x.a6})();(function installTearOffs(){var x=a._instance_0u,w=a._instance_1u,v=a._instance_2u
x(B.Su.prototype,"gatU","IW",0)
var u
w(u=B.St.prototype,"gaRF","acC",4)
x(u,"gaa6","DJ",0)
x(u,"ga4_","Jb",0)
x(u,"ga3Z","Ja",0)
x(u,"ga3X","J8",0)
x(u,"ga3Y","J9",0)
w(u=B.a_t.prototype,"gaMN","aMO",1)
x(u,"gaLW","Vb",2)
w(u=B.a1o.prototype,"gaYc","Z2",1)
w(u,"gaYa","aYb",10)
x(B.NU.prototype,"gdN","k",0)
x(u=B.NX.prototype,"gaKd","aKe",2)
v(u,"gagZ","Zp",11)})();(function inheritance(){var x=a.inheritMany,w=a.inherit
x(A.Z,[B.CN,B.ana,B.Fq,B.a_J,B.aN_,B.a_t,B.aIm,B.Mv,B.E0,B.aCX,B.NS,B.aIy,B.a1o,B.aGi,B.a6Q,B.Tj,B.a6P,B.xd,B.rJ,B.Gf,B.a7W,B.EG,B.zE,B.NT,B.NV])
w(B.Pi,A.f9)
x(A.jA,[B.aNA,B.b7x,B.b7u,B.b7v,B.b7r,B.b7s,B.b7t,B.b7o,B.b7p,B.b7w,B.b79,B.b77,B.b7a,B.b7b,B.b7c,B.b76,B.b7g,B.b75,B.b74,B.b73,B.aq1,B.aD_,B.aD0,B.aIp,B.aID,B.aIG,B.aIH,B.awE,B.awD,B.alu])
x(A.ib,[B.aNB,B.anb,B.b7y,B.b7q,B.b78,B.b7d,B.b7e,B.b7f,B.b7h,B.b7i,B.b7j,B.b7k,B.b7l,B.b7m,B.aN0,B.aN1,B.aN2,B.aq0,B.bEV,B.aDb,B.aDc,B.aD8,B.aD9,B.aDa,B.aD1,B.aIq,B.aIr,B.aIs,B.aIt,B.aIu,B.aIv,B.aIw,B.aIx,B.aIo,B.bF2,B.aGj,B.aIz,B.aIA,B.aIB,B.aIC,B.aII,B.aIJ,B.bcd,B.bcc,B.aoW,B.aoX,B.aoY,B.aoZ,B.alv,B.als,B.alt,B.alw])
x(A.N,[B.oH,B.xR,B.NW])
x(A.T,[B.Su,B.St,B.NX])
x(A.at,[B.Rc,B.a9w,B.vZ])
x(A.qg,[B.b7n,B.aCZ,B.aIE,B.aIF])
w(B.aIn,B.aIm)
w(B.mn,B.Mv)
w(B.a3a,B.E0)
w(B.aCY,B.aCX)
w(B.a4G,B.NS)
w(B.bIR,B.aIy)
w(B.NU,A.d3)
w(B.ac1,A.CF)
x(B.a6Q,[B.a1H,B.alr])
x(B.rJ,[B.FO,B.C0,B.Cp])
w(B.Ge,B.Gf)
w(B.ait,B.CN)
x(A.GH,[B.vh,B.NR,B.vg,B.my,B.a4H])})()
A.o8(b.typeUniverse,JSON.parse('{"CN":{"dB":["1"]},"Pi":{"f9":["1","2"],"f9.S":"1","f9.T":"2"},"xR":{"N":[],"m":[]},"oH":{"N":[],"m":[]},"Su":{"T":["oH"]},"Rc":{"at":[],"m":[]},"St":{"T":["xR"]},"a9w":{"at":[],"m":[]},"vZ":{"at":[],"m":[]},"mn":{"Mv":[]},"a3a":{"E0":[]},"a4G":{"NS":[]},"NU":{"d3":["NV"],"aX":[]},"NW":{"N":[],"m":[]},"NX":{"T":["NW"]},"ac1":{"aX":[]},"Tj":{"dB":["1"]},"xd":{"bJq":[]},"FO":{"rJ":[]},"C0":{"rJ":[]},"Cp":{"rJ":[]},"Gf":{"bM":[]},"Ge":{"bM":[]},"ait":{"dB":["@"]},"a7W":{"bM":[]}}'))
A.bJT(b.typeUniverse,JSON.parse('{"CN":1,"a6Q":1}'))
var y=(function rtii(){var x=A.au
return{b:x("xd"),L:x("bM"),e:x("as<ay4>"),_:x("as<@>"),x:x("as<~>"),v:x("dn<x,o>"),I:x("ay4"),S:x("E<ai<o,L>>"),t:x("E<ai<o,@>>"),Q:x("E<E0>"),d:x("E<ih<@>>"),s:x("E<o>"),p:x("E<m>"),m:x("aB"),l:x("K<aB>"),F:x("K<ai<o,@>>"),j:x("K<@>"),J:x("K<x>"),P:x("ai<o,@>"),f:x("ai<@,@>"),E:x("Mv"),G:x("E0"),h:x("mn"),o:x("p4"),a:x("bj"),K:x("Z"),M:x("NS"),g:x("zE"),Z:x("a6P<Z?>"),N:x("o"),i:x("pB"),O:x("e3"),D:x("rJ"),U:x("Y<o>"),R:x("er<Fq>"),n:x("er<~>"),V:x("b3<xd>"),r:x("b3<@>"),T:x("b3<~>"),k:x("SE<aB>"),C:x("o2<aB>"),u:x("av<xd>"),c:x("av<@>"),W:x("av<~>"),q:x("k9"),y:x("L"),z:x("@"),A:x("aB?"),X:x("Z?"),H:x("~")}})();(function constants(){var x=a.makeConstList
C.Tl=new B.a_J(D.mH)
C.WE=new A.b5(5e6)
C.xo=new A.ap(32,0,32,0)
C.y7=new A.ah(57638,!1)
C.y8=new A.ah(57639,!1)
C.YF=new A.ah(58337,!1)
C.YG=new A.ah(58341,!1)
C.YN=new A.ah(58923,!1)
C.yd=new A.ah(59048,!1)
C.YO=new A.ah(59049,!1)
C.YP=new A.ah(59077,!1)
C.a5A=A.b(x([1,2,4,8,16]),A.au("E<x>"))
C.a9k=A.b(x([]),y.Q)
C.acF=new A.dn([1,"The user canceled the fetching of the video.",2,"A network error occurred while fetching the video, despite having previously been available.",3,"An error occurred while trying to decode the video, despite having previously been determined to be usable.",4,"The video has been found to be unsuitable (missing or in a format not supported by your browser)."],y.v)
C.acG=new A.dn([1,"MEDIA_ERR_ABORTED",2,"MEDIA_ERR_NETWORK",3,"MEDIA_ERR_DECODE",4,"MEDIA_ERR_SRC_NOT_SUPPORTED"],y.v)
C.Te=new A.F(1,0.9098039215686274,0.9607843137254902,0.9137254901960784,D.r)
C.RF=new A.F(1,0.7843137254901961,0.9019607843137255,0.788235294117647,D.r)
C.S2=new A.F(1,0.6470588235294118,0.8392156862745098,0.6549019607843137,D.r)
C.Su=new A.F(1,0.5058823529411764,0.7803921568627451,0.5176470588235295,D.r)
C.RO=new A.F(1,0.4,0.7333333333333333,0.41568627450980394,D.r)
C.RP=new A.F(1,0.2980392156862745,0.6862745098039216,0.3137254901960784,D.r)
C.Tg=new A.F(1,0.2627450980392157,0.6274509803921569,0.2784313725490196,D.r)
C.Sm=new A.F(1,0.2196078431372549,0.5568627450980392,0.23529411764705882,D.r)
C.Sy=new A.F(1,0.1803921568627451,0.49019607843137253,0.19607843137254902,D.r)
C.Rw=new A.F(1,0.10588235294117647,0.3686274509803922,0.12549019607843137,D.r)
C.ad8=new A.dn([50,C.Te,100,C.RF,200,C.S2,300,C.Su,400,C.RO,500,C.RP,600,C.Tg,700,C.Sm,800,C.Sy,900,C.Rw],A.au("dn<x,F>"))
C.adi=new A.yQ(C.ad8,1,0.2980392156862745,0.6862745098039216,0.3137254901960784,D.r)
C.Fv=new A.fB("FlutterWebRTC.Method",D.b8,null)
C.agC=new B.my(0,"RTCIceConnectionStateNew")
C.agD=new B.my(1,"RTCIceConnectionStateChecking")
C.agE=new B.my(2,"RTCIceConnectionStateCompleted")
C.agF=new B.my(3,"RTCIceConnectionStateConnected")
C.agG=new B.my(4,"RTCIceConnectionStateCount")
C.JM=new B.my(5,"RTCIceConnectionStateFailed")
C.agH=new B.my(6,"RTCIceConnectionStateDisconnected")
C.JN=new B.my(7,"RTCIceConnectionStateClosed")
C.JO=new B.NR(0,"RTCIceGatheringStateNew")
C.agI=new B.NR(1,"RTCIceGatheringStateGathering")
C.agJ=new B.NR(2,"RTCIceGatheringStateComplete")
C.rv=new B.vg(0,"RTCPeerConnectionStateClosed")
C.JP=new B.vg(1,"RTCPeerConnectionStateFailed")
C.JQ=new B.vg(2,"RTCPeerConnectionStateDisconnected")
C.JR=new B.vg(3,"RTCPeerConnectionStateNew")
C.JS=new B.vg(4,"RTCPeerConnectionStateConnecting")
C.JT=new B.vg(5,"RTCPeerConnectionStateConnected")
C.agK=new B.vh(0,"RTCSignalingStateStable")
C.agL=new B.vh(1,"RTCSignalingStateHaveLocalOffer")
C.agM=new B.vh(2,"RTCSignalingStateHaveRemoteOffer")
C.agN=new B.vh(3,"RTCSignalingStateHaveLocalPrAnswer")
C.agO=new B.vh(4,"RTCSignalingStateHaveRemotePrAnswer")
C.JU=new B.vh(5,"RTCSignalingStateClosed")
C.agP=new B.NV(0,0,0)
C.JV=new B.a4H(0,"RTCVideoViewObjectFitContain")
C.JW=new B.a4H(1,"RTCVideoViewObjectFitCover")
C.nv=new A.cf(20,null,null,null)
C.akd=new A.cf(48,null,null,null)
C.Lm=new A.cf(null,64,null,null)
C.an1=new A.y(!0,D.l,null,null,null,null,22,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.LX=new A.y(!0,D.l,null,null,null,null,26,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.tz=new A.y(!0,D.aq,null,null,null,null,16,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.anQ=new A.y(!0,D.l,null,null,null,null,12,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.anP=new A.y(!0,D.l,null,null,null,null,18,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.aoD=new A.y(!0,D.n,null,null,null,null,32,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)
C.M1=new A.y(!0,D.n,null,null,null,null,40,D.y,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null)})();(function staticFields(){$.bSa=!1
$.bQC=1})();(function lazyInitializers(){var x=a.lazyFinal
x($,"ckf","bXx",()=>new B.aIn())
x($,"ciE","bWH",()=>{var w=new B.a1o(A.a6R(null,null,!1,y.P))
A.c2s("FlutterWebRTC.Event").Q3().mR(w.gaYc(),w.gaYa())
return w})
x($,"cjT","bXo",()=>B.c4A())
x($,"cil","bLi",()=>D.c.q(A.aj(A.aj(A.aj(A.bL_(),"window"),"navigator"),"userAgent"),"Firefox"))})()};
((a,b)=>{a[b]=a.current
a.eventLog.push({p:"main.dart.js_12",e:"endPart",h:b})})($__dart_deferred_initializers__,"WcwcTg1IIzy5GwX053BGdpywFvM=");