import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def m(n): return f"{n//100}.{str(n%100).zfill(2)}"
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def v(n, one, many): return one if n == 1 else many
def cartridges(n, p):
    k = -(-n//p)
    return f"The {pl(n,' page',' pages')} at {pl(p,' page',' pages')} a cartridge {v(n,'makes','make')} {pl(k,' cartridge',' cartridges')}, the last cartridge covering {pl(n-(k-1)*p,' page',' pages')}."
def days(y, d):
    k = y//d
    return f"A {y} page cartridge at {pl(d,' page',' pages')} a day lasts {pl(k,' full day',' full days')} with {pl(y-k*d,' page',' pages')} left for the next day."
def cost(c, pc, n):
    cc = c*pc
    pp = (2*cc + n)//(2*n)
    return f"The {pl(c,' cartridge',' cartridges')} at ${m(pc)} a cartridge {v(c,'comes','come')} to ${m(cc)}, ${m(pp)} a page."
def time_(n, pm):
    t = -(-n//pm); h, r = t//60, t%60
    return f"The {pl(n,' page',' pages')} at {pl(pm,' page',' pages')} a minute {v(n,'takes','take')} {pl(t,' minute',' minutes')}, {pl(h,' hour',' hours')} {pl(r,' minute',' minutes')}."
random.seed(775)
R = random.randint
cases = [
 dict(fn="cartridges", args=["12500","3000"], expect=cartridges(12500,3000)),
 dict(fn="days", args=["3000","220"], expect=days(3000,220)),
 dict(fn="cost", args=["5","89.99","12500"], expect=cost(5,8999,12500)),
 dict(fn="time", args=["12500","30"], expect=time_(12500,30)),
 dict(fn="cartridges", args=["1","1"], expect=cartridges(1,1)),
 dict(fn="cartridges", args=["12000","3000"], expect=cartridges(12000,3000)),
 dict(fn="cartridges", args=["1000000","100000"], expect=cartridges(1000000,100000)),
 dict(fn="days", args=["1","1"], expect=days(1,1)),
 dict(fn="days", args=["220","220"], expect=days(220,220)),
 dict(fn="days", args=["100","220"], expect=days(100,220)),
 dict(fn="cost", args=["1","0.01","1"], expect=cost(1,1,1)),
 dict(fn="cost", args=["10000","999.99","1000000"], expect=cost(10000,99999,1000000)),
 dict(fn="time", args=["1","1"], expect=time_(1,1)),
 dict(fn="time", args=["60","1"], expect=time_(60,1)),
]
for _ in range(20):
    n,p=R(1,1000000),R(1,100000); cases.append(dict(fn="cartridges", args=[str(n),str(p)], expect=cartridges(n,p)))
for _ in range(20):
    y,d=R(1,100000),R(1,100000); cases.append(dict(fn="days", args=[str(y),str(d)], expect=days(y,d)))
for _ in range(25):
    c,p,n=R(1,10000),R(1,99999),R(1,1000000); cases.append(dict(fn="cost", args=[str(c),dec(p),str(n)], expect=cost(c,p,n)))
for _ in range(20):
    n,pm=R(1,1000000),R(1,1000); cases.append(dict(fn="time", args=[str(n),str(pm)], expect=time_(n,pm)))
errs=[["cartridges",["0","3000"]],["cartridges",["1000001","3000"]],["cartridges",["2.5","3000"]],["cartridges",["12500","0"]],["cartridges",["12500","100001"]],["cartridges",["12500","x"]],
 ["days",["0","220"]],["days",["3000","0"]],["days",["3000","100001"]],["days",["3000","1.5"]],
 ["cost",["0","89.99","12500"]],["cost",["10001","89.99","12500"]],["cost",["5","0","12500"]],["cost",["5","1000","12500"]],["cost",["5","89.995","12500"]],["cost",["5","89.99","0"]],
 ["time",["0","30"]],["time",["12500","0"]],["time",["12500","1001"]],["time",["12500","30.5"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
