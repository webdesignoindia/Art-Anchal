import { useState } from "react";

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    :root {
      --bg:      #F7F7F8;
      --surface: #FFFFFF;
      --border:  #EBEBEC;
      --ink:     #111112;
      --ink2:    #6B6B76;
      --ink3:    #ADADB5;
      --accent:  #111112;
      --green:   #16A34A;
      --green-bg:#F0FDF4;
      --red:     #DC2626;
      --red-bg:  #FEF2F2;
      --amber:   #D97706;
      --amber-bg:#FFFBEB;
      --blue:    #2563EB;
      --blue-bg: #EFF6FF;
      --shadow:  0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
      --shadow-md:0 4px 12px rgba(0,0,0,0.08);
    }

    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--ink);min-height:100vh;-webkit-font-smoothing:antialiased;}
    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-track{background:transparent;}
    ::-webkit-scrollbar-thumb{background:var(--border);border-radius:4px;}

    @keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
    .fade-up{animation:fadeUp .22s ease both;}

    /* NAV */
    .nav{
      background:var(--surface);border-bottom:1px solid var(--border);
      display:flex;align-items:center;gap:12px;
      padding:0 20px;height:56px;
      position:sticky;top:0;z-index:100;
    }
    .nav-logo{font-size:15px;font-weight:700;color:var(--ink);flex:1;line-height:1.25;letter-spacing:-.3px;}
    .nav-logo span{display:block;font-size:11px;font-weight:400;color:var(--ink2);letter-spacing:0;}
    .nav-icon-btn{background:var(--bg);border:1px solid var(--border);color:var(--ink2);width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;transition:.15s;}
    .nav-icon-btn:hover{background:var(--border);}

    /* TABS */
    .tab-bar{position:fixed;bottom:0;left:0;right:0;background:var(--surface);border-top:1px solid var(--border);display:flex;z-index:100;}
    .tab-btn{flex:1;border:none;background:transparent;color:var(--ink3);padding:10px 4px 14px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;font-size:10px;font-weight:500;font-family:'Inter',sans-serif;transition:.15s;letter-spacing:.1px;}
    .tab-btn.active{color:var(--ink);}
    .tab-btn .tab-icon{font-size:19px;}

    /* LAYOUT */
    .page{padding:20px 16px 88px;max-width:480px;margin:0 auto;}

    /* CARD */
    .card{background:var(--surface);border-radius:12px;border:1px solid var(--border);padding:16px;}

    /* STATS */
    .stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
    .stat-card{background:var(--surface);border-radius:12px;padding:14px;border:1px solid var(--border);}
    .stat-label{font-size:11px;color:var(--ink2);font-weight:500;letter-spacing:.2px;margin-bottom:6px;}
    .stat-value{font-size:20px;font-weight:700;letter-spacing:-.5px;line-height:1;}
    .stat-sub{font-size:11px;color:var(--ink3);margin-top:4px;}
    .stat-green{color:var(--green);}
    .stat-red{color:var(--red);}
    .stat-amber{color:var(--amber);}
    .stat-blue{color:var(--blue);}
    .stat-ink{color:var(--ink);}
    .section-title{font-size:13px;font-weight:600;color:var(--ink);letter-spacing:-.1px;}

    /* HERO CARD */
    .hero-card{background:var(--ink);border-radius:16px;padding:20px;color:#fff;margin-bottom:16px;}
    .hero-label{font-size:11px;font-weight:500;opacity:.5;letter-spacing:.3px;text-transform:uppercase;margin-bottom:8px;}
    .hero-amount{font-size:36px;font-weight:700;letter-spacing:-1px;line-height:1;}
    .hero-sub{font-size:12px;opacity:.5;margin-top:6px;}

    /* SECTION */
    .section-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
    .section-title{font-size:13px;font-weight:600;color:var(--ink);letter-spacing:-.1px;}
    .btn-ghost{border:1px solid var(--border);background:transparent;color:var(--ink2);font-size:12px;font-weight:500;padding:5px 12px;border-radius:20px;cursor:pointer;font-family:'Inter',sans-serif;transition:.15s;}
    .btn-ghost:hover{background:var(--bg);}

    /* LIST */
    .list-row{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--border);}
    .list-row:last-child{border-bottom:none;}
    .row-dot{width:8px;height:8px;border-radius:50%;background:var(--border);flex-shrink:0;}
    .row-main{flex:1;min-width:0;}
    .row-name{font-weight:500;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-.1px;}
    .row-sub{font-size:12px;color:var(--ink2);margin-top:1px;}
    .row-amount{font-size:14px;font-weight:600;letter-spacing:-.3px;}

    /* CHIPS */
    .chip{display:inline-flex;align-items:center;font-size:11px;font-weight:500;padding:2px 8px;border-radius:20px;}
    .chip-green{background:var(--green-bg);color:var(--green);}
    .chip-red{background:var(--red-bg);color:var(--red);}
    .chip-amber{background:var(--amber-bg);color:var(--amber);}
    .chip-blue{background:var(--blue-bg);color:var(--blue);}
    .chip-ink{background:var(--bg);color:var(--ink2);}

    /* FAB */
    .fab{position:fixed;bottom:74px;right:18px;width:50px;height:50px;border-radius:50%;background:var(--ink);border:none;color:#fff;font-size:24px;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-md);cursor:pointer;z-index:99;transition:.2s;}
    .fab:hover{transform:scale(1.06);box-shadow:0 8px 20px rgba(0,0,0,0.15);}

    /* MODAL */
    .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:200;display:flex;align-items:flex-end;justify-content:center;animation:fadeIn .18s ease;}
    .modal{background:var(--surface);border-radius:20px 20px 0 0;padding:20px 20px 36px;width:100%;max-width:480px;max-height:92vh;overflow-y:auto;animation:fadeUp .22s ease;}
    .modal-handle{width:36px;height:3px;background:var(--border);border-radius:3px;margin:0 auto 18px;}
    .modal-title{font-size:18px;font-weight:700;color:var(--ink);margin-bottom:18px;letter-spacing:-.3px;}

    /* FORMS */
    .form-group{margin-bottom:14px;}
    .form-label{font-size:11px;color:var(--ink2);font-weight:600;letter-spacing:.3px;text-transform:uppercase;margin-bottom:6px;display:block;}
    .form-input{width:100%;padding:11px 13px;border:1px solid var(--border);border-radius:9px;font-family:'Inter',sans-serif;font-size:14px;background:var(--bg);color:var(--ink);outline:none;transition:.15s;}
    .form-input:focus{border-color:var(--ink);background:var(--surface);}
    .form-select{appearance:none;cursor:pointer;}
    .form-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;}

    /* BUTTONS */
    .btn-primary{width:100%;padding:13px;background:var(--ink);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:.15s;letter-spacing:-.1px;margin-top:4px;}
    .btn-primary:hover{opacity:.88;}
    .btn-primary:disabled{opacity:.35;cursor:not-allowed;}

    /* TOGGLE GROUP */
    .toggle-group{display:flex;background:var(--bg);border-radius:10px;padding:3px;gap:2px;margin-bottom:14px;}
    .toggle-btn{flex:1;padding:"8px 4px";border:none;background:transparent;color:var(--ink2);border-radius:8px;font-family:'Inter',sans-serif;font-size:12px;font-weight:500;cursor:pointer;transition:.15s;padding:8px 4px;}
    .toggle-btn.active{background:var(--surface);color:var(--ink);box-shadow:var(--shadow);font-weight:600;}

    /* INVENTORY */
    .inv-card{background:var(--surface);border-radius:12px;padding:14px;border:1px solid var(--border);margin-bottom:8px;display:flex;align-items:center;gap:12px;}
    .inv-initial{width:40px;height:40px;border-radius:10px;flex-shrink:0;background:var(--bg);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--ink2);}
    .inv-qty{font-size:18px;font-weight:700;letter-spacing:-.5px;}

    /* BARS */
    .bar-row{margin-bottom:10px;}
    .bar-label{display:flex;justify-content:space-between;font-size:12px;color:var(--ink2);margin-bottom:5px;}
    .bar-track{height:5px;background:var(--bg);border-radius:3px;overflow:hidden;}
    .bar-fill{height:100%;border-radius:3px;background:var(--ink);transition:width .5s ease;}

    /* RECEIPT */
    .receipt{background:var(--surface);border-radius:12px;border:1px solid var(--border);padding:18px;margin-bottom:16px;font-size:13px;}
    .receipt-head{text-align:center;border-bottom:1px solid var(--border);padding-bottom:14px;margin-bottom:14px;}
    .receipt-row{display:flex;justify-content:space-between;padding:4px 0;color:var(--ink2);}
    .receipt-total{border-top:1px solid var(--ink);margin-top:10px;padding-top:10px;font-weight:700;font-size:15px;color:var(--ink);}

    /* AVATAR */
    .party-avatar{width:40px;height:40px;border-radius:50%;background:var(--bg);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--ink);font-size:15px;font-weight:700;flex-shrink:0;}

    /* SEARCH */
    .search-bar{display:flex;align-items:center;gap:10px;background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 13px;margin-bottom:14px;}
    .search-bar input{flex:1;border:none;outline:none;font-family:'Inter',sans-serif;font-size:14px;background:transparent;color:var(--ink);}

    /* BILL ITEM */
    .bill-item{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border);}
    .bill-item:last-child{border-bottom:none;}

    /* EMPTY */
    .empty-state{text-align:center;padding:48px 20px;}
    .empty-icon{font-size:40px;margin-bottom:12px;opacity:.3;}
    .empty-title{font-size:15px;font-weight:600;color:var(--ink);margin-bottom:6px;letter-spacing:-.2px;}
    .empty-sub{font-size:13px;color:var(--ink2);}

    /* PAY MODE PILLS */
    .pay-pill{flex:1;padding:9px 4px;border:1px solid var(--border);background:var(--surface);color:var(--ink2);border-radius:9px;font-family:'Inter',sans-serif;font-weight:500;font-size:12px;cursor:pointer;text-align:center;transition:.15s;}
    .pay-pill.active{border-color:var(--ink);background:var(--ink);color:#fff;}

    /* DIVIDER */
    .divider{height:1px;background:var(--border);margin:14px 0;}

    /* ALERT CARD */
    .alert-card{background:var(--amber-bg);border:1px solid #FDE68A;border-radius:12px;padding:14px;margin-bottom:12px;}
  `}</style>
);

const SAREE_TYPES=["Banarasi Silk","Kanjivaram","Chanderi","Georgette","Chiffon","Cotton Silk","Tussar Silk","Organza","Net","Linen"];
const PAY_MODES=["Cash","UPI","Card","Credit"];
const GST_RATE=5;
const fmt=n=>"₹"+Number(n).toLocaleString("en-IN");
const today=()=>new Date().toISOString().slice(0,10);
const TABS=[{id:"dashboard",icon:"🏠",label:"Home"},{id:"billing",icon:"🧾",label:"Bill"},{id:"inventory",icon:"🛍️",label:"Stock"},{id:"customers",icon:"👥",label:"Customers"},{id:"reports",icon:"📊",label:"Reports"}];

function EmptyState({icon,title,sub,action,actionLabel}){
  return(
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <div className="empty-title">{title}</div>
      <div className="empty-sub">{sub}</div>
      {action&&<button onClick={action} style={{marginTop:16,padding:"10px 24px",background:"var(--ink)",color:"#fff",border:"none",borderRadius:20,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",fontSize:14}}>{actionLabel}</button>}
    </div>
  );
}

export default function App(){
  const [tab,setTab]=useState("dashboard");
  const [inventory,setInventory]=useState([]);
  const [customers,setCustomers]=useState([]);
  const [suppliers,setSuppliers]=useState([]);
  const [bills,setBills]=useState([]);
  const [purchases,setPurchases]=useState([]);
  const [toast,setToast]=useState(null);

  const showToast=(msg,type="success")=>{setToast({msg,type});setTimeout(()=>setToast(null),2800);};

  const totalSales=bills.reduce((s,b)=>s+b.total,0);
  const totalCollected=bills.reduce((s,b)=>s+b.paid,0);
  const outstanding=totalSales-totalCollected;
  const totalPurchases=purchases.reduce((s,p)=>s+p.total,0);
  const todayStr=today();
  const todayBills=bills.filter(b=>b.date===todayStr);
  const todaySales=todayBills.reduce((s,b)=>s+b.total,0);

  return(
    <div style={{minHeight:"100vh",background:"var(--bg)"}}>
      <FontLoader/>
      <nav className="nav">
        <div className="nav-logo">Baba Vishwanath<span>Silk Saree · Varanasi</span></div>
        <button className="nav-icon-btn" title="Notifications">🔔</button>
        <button className="nav-icon-btn" title="Settings">⚙️</button>
      </nav>
      {tab==="dashboard"&&<Dashboard bills={bills} inventory={inventory} totalSales={totalSales} totalCollected={totalCollected} outstanding={outstanding} todaySales={todaySales} todayBills={todayBills} setTab={setTab}/>}
      {tab==="billing"&&<Billing bills={bills} setBills={setBills} inventory={inventory} setInventory={setInventory} customers={customers} setCustomers={setCustomers} suppliers={suppliers} setSuppliers={setSuppliers} purchases={purchases} setPurchases={setPurchases} showToast={showToast} setTab={setTab}/>}
      {tab==="inventory"&&<Inventory inventory={inventory} setInventory={setInventory} showToast={showToast}/>}
      {tab==="customers"&&<Customers customers={customers} setCustomers={setCustomers} bills={bills} showToast={showToast}/>}
      {tab==="reports"&&<Reports bills={bills} inventory={inventory} purchases={purchases} totalSales={totalSales} totalCollected={totalCollected} outstanding={outstanding} totalPurchases={totalPurchases}/>}
      <nav className="tab-bar">
        {TABS.map(t=>(
          <button key={t.id} className={`tab-btn ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>
            <span className="tab-icon">{t.icon}</span>{t.label}
          </button>
        ))}
      </nav>
      {toast&&(
        <div style={{position:"fixed",top:68,left:"50%",transform:"translateX(-50%)",background:toast.type==="success"?"var(--ink)":"var(--red)",color:"#fff",padding:"10px 18px",borderRadius:20,zIndex:500,fontWeight:500,fontSize:13,boxShadow:"0 4px 16px rgba(0,0,0,0.15)",animation:"fadeUp .2s ease",whiteSpace:"nowrap",fontFamily:"'Inter',sans-serif",letterSpacing:"-.1px"}}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

function Dashboard({bills,inventory,totalSales,totalCollected,outstanding,todaySales,todayBills,setTab}){
  const lowStock=inventory.filter(i=>i.qty<=8);
  const recentBills=[...bills].reverse().slice(0,5);
  const cashToday=todayBills.filter(b=>b.payMode==="Cash").reduce((s,b)=>s+b.paid,0);
  const upiToday=todayBills.filter(b=>b.payMode==="UPI").reduce((s,b)=>s+b.paid,0);

  const payModeIcon=m=>m==="Cash"?"↑":m==="UPI"?"⚡":m==="Card"?"▣":"○";
  const statusColor=s=>s==="Paid"?"green":s==="Partial"?"amber":"red";

  return(
    <div className="page fade-up">
      {/* Hero */}
      <div className="hero-card">
        <div className="hero-label">Today's Sales</div>
        <div className="hero-amount">{fmt(todaySales)}</div>
        <div className="hero-sub">
          {todayBills.length>0
            ?`Cash ${fmt(cashToday)}  ·  UPI ${fmt(upiToday)}  ·  ${todayBills.length} bill${todayBills.length!==1?"s":""}`
            :"No bills recorded today"}
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        <div className="stat-card"><div className="stat-label">Total Sales</div><div className={`stat-value stat-green`}>{fmt(totalSales)}</div><div className="stat-sub">{bills.length} bills</div></div>
        <div className="stat-card"><div className="stat-label">Collected</div><div className="stat-value stat-blue">{fmt(totalCollected)}</div><div className="stat-sub">Received</div></div>
        <div className="stat-card"><div className="stat-label">Credit Due</div><div className="stat-value stat-red">{fmt(outstanding)}</div><div className="stat-sub">{bills.filter(b=>b.status!=="Paid").length} pending</div></div>
        <div className="stat-card"><div className="stat-label">Stock</div><div className="stat-value stat-ink">{inventory.reduce((s,i)=>s+i.qty,0)}</div><div className="stat-sub">{inventory.length} SKUs</div></div>
      </div>

      {/* Recent Bills */}
      <div className="card" style={{marginBottom:12}}>
        <div className="section-head">
          <div className="section-title">Recent Bills</div>
          {bills.length>0&&<button className="btn-ghost" onClick={()=>setTab("billing")}>See all</button>}
        </div>
        {recentBills.length===0
          ?<EmptyState icon="📋" title="No bills yet" sub="Tap Bill below to record your first sale"/>
          :recentBills.map(b=>(
            <div key={b.id} className="list-row">
              <div className="row-dot" style={{background: b.status==="Paid"?"var(--green)":b.status==="Partial"?"var(--amber)":"var(--red)"}}/>
              <div className="row-main">
                <div className="row-name">{b.customer}</div>
                <div className="row-sub">#{b.id} · {b.date} · {b.payMode}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div className="row-amount">{fmt(b.total)}</div>
                <span className={`chip chip-${statusColor(b.status)}`}>{b.status}</span>
              </div>
            </div>
          ))
        }
      </div>

      {/* Low stock */}
      {lowStock.length>0&&(
        <div className="alert-card" style={{marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:600,color:"var(--amber)",marginBottom:8}}>Low Stock</div>
          {lowStock.map(i=>(
            <div key={i.id} className="list-row" style={{paddingTop:7,paddingBottom:7}}>
              <div className="row-dot" style={{background:"var(--amber)"}}/>
              <div className="row-main"><div className="row-name">{i.name}</div><div className="row-sub">{i.category}</div></div>
              <div className="row-amount" style={{color:"var(--amber)"}}>{i.qty} pcs</div>
            </div>
          ))}
        </div>
      )}

      {/* Quick actions */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {[
          {label:"New Bill",   sub:"Record a sale",    action:()=>setTab("billing")},
          {label:"Add Stock",  sub:"Update inventory", action:()=>setTab("inventory")},
          {label:"Customers",  sub:"Manage buyers",    action:()=>setTab("customers")},
          {label:"Reports",    sub:"View analytics",   action:()=>setTab("reports")},
        ].map(a=>(
          <button key={a.label} onClick={a.action} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,padding:"14px",cursor:"pointer",fontFamily:"'Inter',sans-serif",textAlign:"left",transition:".15s"}}>
            <div style={{fontSize:13,fontWeight:600,color:"var(--ink)",marginBottom:2}}>{a.label}</div>
            <div style={{fontSize:11,color:"var(--ink2)"}}>{a.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Billing({bills,setBills,inventory,setInventory,customers,setCustomers,suppliers,setSuppliers,purchases,setPurchases,showToast,setTab}){
  const [view,setView]=useState("list");
  const [receiptBill,setReceiptBill]=useState(null);
  const [custMode,setCustMode]=useState("walkin");
  const [customer,setCustomer]=useState("Walk-in Customer");
  const [custPhone,setCustPhone]=useState("");
  const [date,setDate]=useState(today());
  const [payMode,setPayMode]=useState("Cash");
  const [billItems,setBillItems]=useState([]);
  const [selItem,setSelItem]=useState("");
  const [selQty,setSelQty]=useState(1);
  const [selDisc,setSelDisc]=useState(0);
  const [paidAmt,setPaidAmt]=useState("");
  const [pSupplier,setPSupplier]=useState("");
  const [pNewSupplier,setPNewSupplier]=useState("");
  const [pDate,setPDate]=useState(today());
  const [pItem,setPItem]=useState("");
  const [pQty,setPQty]=useState(1);
  const [pRate,setPRate]=useState("");
  const [pPaid,setPPaid]=useState("");

  const subtotal=billItems.reduce((s,i)=>s+(i.mrp*i.qty*(1-i.discount/100)),0);
  const discAmt=billItems.reduce((s,i)=>s+(i.mrp*i.qty*i.discount/100),0);
  const gstAmt=Math.round(subtotal*GST_RATE/100);
  const grandTotal=subtotal+gstAmt;

  const resetBillForm=()=>{setBillItems([]);setCustomer("Walk-in Customer");setCustPhone("");setPayMode("Cash");setPaidAmt("");setDate(today());setCustMode("walkin");setSelItem("");setSelQty(1);setSelDisc(0);};

  const addItem=()=>{
    if(!selItem){showToast("Select an item","error");return;}
    const inv=inventory.find(i=>i.name===selItem);
    if(!inv||inv.qty<Number(selQty)){showToast("Insufficient stock","error");return;}
    const exists=billItems.findIndex(i=>i.name===selItem);
    if(exists>=0){setBillItems(prev=>prev.map((it,idx)=>idx===exists?{...it,qty:it.qty+Number(selQty)}:it));}
    else{setBillItems(prev=>[...prev,{name:selItem,mrp:inv.mrp,qty:Number(selQty),discount:Number(selDisc)}]);}
    setSelItem("");setSelQty(1);setSelDisc(0);
  };

  const saveBill=()=>{
    if(!billItems.length){showToast("Add at least one item","error");return;}
    const finalCustomer=customer.trim()||"Walk-in Customer";
    const paid=payMode==="Credit"?(parseFloat(paidAmt)||0):grandTotal;
    const status=paid>=grandTotal?"Paid":paid>0?"Partial":"Unpaid";
    const nb={id:bills.length+1001,customer:finalCustomer,phone:custPhone,date,payMode,items:billItems,subtotal,gst:gstAmt,discAmt,total:grandTotal,paid,status};
    billItems.forEach(it=>setInventory(prev=>prev.map(i=>i.name===it.name?{...i,qty:i.qty-it.qty}:i)));
    setBills(prev=>[nb,...prev]);
    setReceiptBill(nb);setView("receipt");showToast("Bill saved! 🎉");resetBillForm();
  };

  const savePurchase=()=>{
    const supplierName=pNewSupplier.trim()||pSupplier;
    if(!supplierName||!pItem.trim()||!pRate){showToast("Fill all required fields","error");return;}
    if(pNewSupplier.trim()&&!suppliers.find(s=>s.name===pNewSupplier.trim())){setSuppliers(prev=>[...prev,{id:Date.now(),name:pNewSupplier.trim(),city:""}]);}
    const total=Number(pQty)*parseFloat(pRate);
    const paid=parseFloat(pPaid)||0;
    const status=paid>=total?"Paid":paid>0?"Partial":"Unpaid";
    // Add to inventory if new item
    const existingInv=inventory.find(i=>i.name.toLowerCase()===pItem.trim().toLowerCase());
    if(existingInv){setInventory(prev=>prev.map(i=>i.name===existingInv.name?{...i,qty:i.qty+Number(pQty)}:i));}
    else{setInventory(prev=>[...prev,{id:Date.now(),name:pItem.trim(),category:"Banarasi Silk",qty:Number(pQty),mrp:parseFloat(pRate)*2,cost:parseFloat(pRate)}]);}
    setPurchases(prev=>[{id:Date.now(),supplier:supplierName,date:pDate,item:pItem.trim(),qty:Number(pQty),rate:parseFloat(pRate),total,paid,status},...prev]);
    showToast("Purchase saved!");setView("list");
    setPSupplier("");setPNewSupplier("");setPItem("");setPQty(1);setPRate("");setPPaid("");
  };

  if(view==="receipt"&&receiptBill){
    const b=receiptBill;
    return(
      <div className="page fade-up">
        <div className="receipt">
          <div className="receipt-head">
            <div style={{fontWeight:700,fontSize:16,color:"var(--ink)",letterSpacing:"-.3px"}}>Baba Vishwanath Silk Saree</div>
            <div style={{fontSize:11,color:"var(--ink2)",marginTop:3}}>Varanasi, Uttar Pradesh</div>
            <div style={{marginTop:10,display:"flex",justifyContent:"space-between",fontSize:12,color:"var(--ink2)"}}>
              <span>Bill <b style={{color:"var(--ink)"}}>#{b.id}</b></span>
              <span><b style={{color:"var(--ink)"}}>{b.date}</b></span>
            </div>
          </div>
          <div style={{marginBottom:12,fontSize:13}}>
            <span style={{color:"var(--ink2)"}}>Customer: </span>
            <b>{b.customer}</b>
            {b.phone&&<span style={{color:"var(--ink2)"}}> · {b.phone}</span>}
          </div>
          <div style={{borderBottom:"1px solid var(--border)",paddingBottom:10,marginBottom:10}}>
            {b.items.map((it,i)=>(
              <div key={i} className="receipt-row">
                <span style={{maxWidth:"65%",color:"var(--ink)"}}>
                  {it.name}
                  <span style={{display:"block",fontSize:11,color:"var(--ink2)"}}>{fmt(it.mrp)} × {it.qty}{it.discount>0?` — ${it.discount}% off`:""}</span>
                </span>
                <b style={{color:"var(--ink)"}}>{fmt(it.mrp*it.qty*(1-it.discount/100))}</b>
              </div>
            ))}
          </div>
          <div className="receipt-row"><span>Subtotal</span><span>{fmt(b.subtotal)}</span></div>
          {b.discAmt>0&&<div className="receipt-row" style={{color:"var(--green)"}}><span>Discount</span><span>−{fmt(b.discAmt)}</span></div>}
          <div className="receipt-row"><span>GST @ {GST_RATE}%</span><span>+{fmt(b.gst)}</span></div>
          <div className="receipt-total" style={{display:"flex",justifyContent:"space-between"}}><span>Total</span><span>{fmt(b.total)}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:13}}>
            <span style={{color:"var(--green)",fontWeight:500}}>Paid ({b.payMode})</span>
            <span style={{color:"var(--green)",fontWeight:600}}>{fmt(b.paid)}</span>
          </div>
          {b.total-b.paid>0&&<div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontSize:13}}>
            <span style={{color:"var(--red)",fontWeight:500}}>Balance Due</span>
            <span style={{color:"var(--red)",fontWeight:600}}>{fmt(b.total-b.paid)}</span>
          </div>}
          <div style={{textAlign:"center",marginTop:16,fontSize:12,color:"var(--ink3)"}}>Thank you for your purchase</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <button onClick={()=>setView("list")} style={{padding:"12px",borderRadius:10,border:"1px solid var(--border)",background:"var(--surface)",color:"var(--ink)",fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",fontSize:14}}>← Bills</button>
          <button onClick={()=>setView("newbill")} style={{padding:"12px",borderRadius:10,border:"none",background:"var(--ink)",color:"#fff",fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",fontSize:14}}>+ New Bill</button>
        </div>
      </div>
    );
  }

  if(view==="newbill"){
    return(
      <div className="page fade-up">
        <button onClick={()=>setView("list")} style={{background:"none",border:"none",cursor:"pointer",color:"var(--ink2)",fontWeight:500,fontSize:13,marginBottom:14,display:"flex",alignItems:"center",gap:4,fontFamily:"'Inter',sans-serif"}}>← Back</button>
        <div style={{fontSize:18,fontWeight:700,letterSpacing:"-.4px",marginBottom:16}}>New Bill</div>
        <div className="card" style={{marginBottom:12}}>
          <div className="form-label" style={{marginBottom:6}}>Customer</div>
          <div className="toggle-group">
            {[{k:"walkin",l:"Walk-in"},{k:"registered",l:"Saved"},{k:"new",l:"+ New"}].map(o=>(
              <button key={o.k} className={`toggle-btn ${custMode===o.k?"active":""}`} onClick={()=>{setCustMode(o.k);if(o.k==="walkin"){setCustomer("Walk-in Customer");setCustPhone("");}else{setCustomer("");setCustPhone("");}}}>{o.l}</button>
            ))}
          </div>
          {custMode==="walkin"&&(
            <div>
              <input className="form-input" style={{marginBottom:8}} placeholder="Customer name (optional)" value={customer==="Walk-in Customer"?"":customer} onChange={e=>setCustomer(e.target.value||"Walk-in Customer")}/>
              <input className="form-input" type="tel" placeholder="Phone number (optional)" value={custPhone} onChange={e=>setCustPhone(e.target.value)}/>
            </div>
          )}
          {custMode==="registered"&&(
            customers.length===0
              ?<div style={{color:"var(--ink2)",fontSize:13,textAlign:"center",padding:"10px 0"}}>No saved customers. Use <b>➕ New</b> to add one.</div>
              :<>
                <select className="form-input form-select" style={{marginBottom:8}} value={customer} onChange={e=>{const c=customers.find(x=>x.name===e.target.value);setCustomer(e.target.value);setCustPhone(c?.phone||"");}}>
                  <option value="">Select customer…</option>
                  {customers.map(c=><option key={c.id}>{c.name}{c.phone?` · ${c.phone}`:""}</option>)}
                </select>
                {customer&&<div style={{background:"var(--bg)",borderRadius:10,padding:"10px 12px",fontSize:13,display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:20}}>👤</span><div><div style={{fontWeight:700}}>{customer}</div>{custPhone&&<div style={{color:"var(--ink2)",fontSize:12}}>{custPhone}</div>}</div></div>}
              </>
          )}
          {custMode==="new"&&(
            <div>
              <input className="form-input" style={{marginBottom:8}} placeholder="Customer name *" value={customer} onChange={e=>setCustomer(e.target.value)}/>
              <input className="form-input" type="tel" style={{marginBottom:8}} placeholder="Phone number *" value={custPhone} onChange={e=>setCustPhone(e.target.value)}/>
              <button onClick={()=>{if(!customer.trim()||!custPhone.trim()){showToast("Enter name and phone","error");return;}if(customers.find(c=>c.phone===custPhone.trim())){showToast("Phone already registered","error");return;}setCustomers(prev=>[...prev,{id:Date.now(),name:customer.trim(),phone:custPhone.trim(),city:""}]);showToast(`${customer} saved! ✅`);}} style={{width:"100%",padding:"10px",background:"var(--bg)",color:"var(--ink)",border:"1px solid var(--border)",borderRadius:9,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",fontSize:13}}>Save to Customer List</button>
            </div>
          )}
          <div className="form-row" style={{marginTop:12}}>
            <div><div className="form-label">Date</div><input type="date" className="form-input" value={date} onChange={e=>setDate(e.target.value)}/></div>
            <div><div className="form-label">Payment Mode</div>
              <select className="form-input form-select" value={payMode} onChange={e=>setPayMode(e.target.value)}>
                <option value="Cash">💵 Cash</option><option value="UPI">📱 UPI</option><option value="Card">💳 Card</option><option value="Credit">🤝 Credit</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card" style={{marginBottom:12}}>
          <div className="form-label" style={{marginBottom:8}}>Add Items</div>
          {inventory.filter(i=>i.qty>0).length===0
            ?<div style={{color:"var(--ink2)",fontSize:13,textAlign:"center",padding:"10px 0"}}>No stock available. <span style={{color:"var(--ink)",fontWeight:600,cursor:"pointer"}} onClick={()=>setTab("inventory")}>Add stock first →</span></div>
            :<>
              <select className="form-input form-select" style={{marginBottom:8}} value={selItem} onChange={e=>setSelItem(e.target.value)}>
                <option value="">Select saree…</option>
                {inventory.filter(i=>i.qty>0).map(i=><option key={i.id} value={i.name}>{i.name} — {fmt(i.mrp)} (Stock: {i.qty})</option>)}
              </select>
              <div className="form-row" style={{marginBottom:8}}>
                <div><div className="form-label">Qty</div><input type="number" className="form-input" min={1} value={selQty} onChange={e=>setSelQty(e.target.value)}/></div>
                <div><div className="form-label">Discount %</div><input type="number" className="form-input" min={0} max={100} value={selDisc} onChange={e=>setSelDisc(e.target.value)} placeholder="0"/></div>
              </div>
              <button onClick={addItem} style={{width:"100%",padding:"10px",background:"var(--ink)",color:"#fff",border:"none",borderRadius:9,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",fontSize:13}}>Add to Bill</button>
            </>
          }
        </div>
        {billItems.length>0&&(
          <div className="card" style={{marginBottom:12}}>
            <div className="form-label" style={{marginBottom:8}}>Bill ({billItems.length} item{billItems.length!==1?"s":""})</div>
            {billItems.map(it=>(
              <div key={it.name} className="bill-item">
                <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{it.name}</div><div style={{fontSize:12,color:"var(--ink2)"}}>{fmt(it.mrp)} × {it.qty}{it.discount>0?` · ${it.discount}% off`:""}</div></div>
                <div style={{fontWeight:700,fontSize:14,color:"var(--green)",marginRight:10}}>{fmt(it.mrp*it.qty*(1-it.discount/100))}</div>
                <button onClick={()=>setBillItems(prev=>prev.filter(i=>i.name!==it.name))} style={{background:"var(--red)",color:"#fff",border:"none",width:26,height:26,borderRadius:6,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>×</button>
              </div>
            ))}
            <div style={{background:"var(--bg)",borderRadius:9,padding:"12px",marginTop:10,fontSize:13}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,color:"var(--ink2)"}}><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
              {discAmt>0&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:4,color:"var(--green)"}}><span>Discount</span><span>−{fmt(discAmt)}</span></div>}
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,color:"var(--ink2)"}}><span>GST ({GST_RATE}%)</span><span>+{fmt(gstAmt)}</span></div>
              <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,fontSize:16,color:"var(--ink)",borderTop:"1px solid var(--border)",paddingTop:8,marginTop:6,letterSpacing:"-.3px"}}><span>Total</span><span>{fmt(grandTotal)}</span></div>
            </div>
            {payMode==="Credit"&&<div style={{marginTop:12}}><div className="form-label">Amount Paid Now (₹)</div><input type="number" className="form-input" value={paidAmt} onChange={e=>setPaidAmt(e.target.value)} placeholder="Leave 0 for full credit"/></div>}
          </div>
        )}
        <button className="btn-primary" onClick={saveBill} disabled={!billItems.length}>Save Bill</button>
      </div>
    );
  }

  if(view==="purchase"){
    return(
      <div className="page fade-up">
        <button onClick={()=>setView("list")} style={{background:"none",border:"none",cursor:"pointer",color:"var(--ink2)",fontWeight:500,fontSize:13,marginBottom:14,fontFamily:"'Inter',sans-serif"}}>← Back</button>
        <div style={{fontSize:18,fontWeight:700,letterSpacing:"-.4px",marginBottom:16}}>Purchase Entry</div>
        <div className="card">
          <div className="form-group">
            <label className="form-label">Supplier *</label>
            {suppliers.length>0&&<select className="form-input form-select" style={{marginBottom:8}} value={pSupplier} onChange={e=>setPSupplier(e.target.value)}><option value="">Select existing…</option>{suppliers.map(s=><option key={s.id}>{s.name}</option>)}</select>}
            <input className="form-input" placeholder={suppliers.length?"Or type new supplier name":"Supplier name *"} value={pNewSupplier} onChange={e=>setPNewSupplier(e.target.value)}/>
          </div>
          <div className="form-group"><label className="form-label">Invoice Date</label><input type="date" className="form-input" value={pDate} onChange={e=>setPDate(e.target.value)}/></div>
          <div className="form-group">
            <label className="form-label">Item Name *</label>
            {inventory.length>0&&<select className="form-input form-select" style={{marginBottom:8}} value={pItem} onChange={e=>setPItem(e.target.value)}><option value="">Select existing item…</option>{inventory.map(i=><option key={i.id}>{i.name}</option>)}</select>}
            <input className="form-input" placeholder={inventory.length?"Or type new item name":"Item name *"} value={pItem} onChange={e=>setPItem(e.target.value)}/>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Qty *</label><input type="number" className="form-input" min={1} value={pQty} onChange={e=>setPQty(e.target.value)}/></div>
            <div className="form-group"><label className="form-label">Cost/pc (₹) *</label><input type="number" className="form-input" value={pRate} onChange={e=>setPRate(e.target.value)}/></div>
          </div>
          {pRate&&pQty&&<div style={{background:"var(--bg)",borderRadius:10,padding:"10px 12px",marginBottom:14,fontSize:13,fontWeight:700,color:"var(--ink)"}}>Total: {fmt(Number(pQty)*parseFloat(pRate)||0)}</div>}
          <div className="form-group"><label className="form-label">Amount Paid (₹)</label><input type="number" className="form-input" value={pPaid} onChange={e=>setPPaid(e.target.value)} placeholder="0 if on credit"/></div>
          <button className="btn-primary" onClick={savePurchase}>Save Purchase ✓</button>
        </div>
      </div>
    );
  }

  return(
    <div className="page fade-up">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
        <button onClick={()=>setView("newbill")} style={{padding:"13px",background:"var(--ink)",color:"#fff",border:"none",borderRadius:10,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",fontSize:14}}>New Bill</button>
        <button onClick={()=>setView("purchase")} style={{padding:"13px",background:"var(--surface)",color:"var(--ink)",border:"1px solid var(--border)",borderRadius:10,fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",fontSize:14}}>Purchase</button>
      </div>
      <div style={{fontSize:13,fontWeight:600,color:"var(--ink)",marginBottom:10}}>Sales Bills</div>
      {bills.length===0
        ?<EmptyState icon="🧾" title="No bills yet" sub="Tap 'New Bill' to record your first sale" action={()=>setView("newbill")} actionLabel="+ Create First Bill"/>
        :bills.map(b=>(
          <div key={b.id} className="card fade-up" style={{marginBottom:10}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
              <div>
                <div style={{fontSize:15,fontWeight:700}}>{b.customer}</div>
                <div style={{fontSize:12,color:"var(--ink2)",marginTop:2}}>Bill #{b.id} · {b.date}{b.phone?` · ${b.phone}`:""}</div>
                <div style={{marginTop:5,display:"flex",gap:6,flexWrap:"wrap"}}>
                  <span className={`chip chip-${b.payMode==="Cash"?"green":b.payMode==="UPI"?"blue":b.payMode==="Card"?"amber":"red"}`}>{b.payMode}</span>
                  <span className={`chip chip-${b.status==="Paid"?"green":b.status==="Partial"?"amber":"red"}`}>{b.status}</span>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:19,fontWeight:800,color:"var(--green)"}}>{fmt(b.total)}</div>
                {b.total-b.paid>0&&<div style={{fontSize:12,color:"var(--red)",marginTop:2}}>Due: {fmt(b.total-b.paid)}</div>}
              </div>
            </div>
            <div style={{borderTop:"1px solid var(--border)",marginTop:10,paddingTop:8}}>
              {b.items.map((it,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
                  <span style={{color:"var(--ink)"}}>{it.name} × {it.qty}{it.discount>0?` (−${it.discount}%)`:""}</span>
                  <span style={{fontWeight:600}}>{fmt(it.mrp*it.qty*(1-it.discount/100))}</span>
                </div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--ink2)",marginTop:4}}>
                <span>GST: {fmt(b.gst)}</span>
                {b.discAmt>0&&<span>Disc: −{fmt(b.discAmt)}</span>}
                <span>Paid: <b style={{color:"var(--green)"}}>{fmt(b.paid)}</b></span>
              </div>
            </div>
          </div>
        ))
      }
      {purchases.length>0&&(
        <>
          <div style={{fontSize:13,fontWeight:600,color:"var(--ink)",margin:"16px 0 10px"}}>Purchase Entries</div>
          {purchases.map(p=>(
            <div key={p.id} className="card fade-up" style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div><div style={{fontWeight:700,fontSize:14}}>{p.supplier}</div><div style={{fontSize:12,color:"var(--ink2)"}}>{p.date} · {p.item} × {p.qty} pcs @ {fmt(p.rate)}</div></div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:16,fontWeight:700,color:"var(--red)"}}>{fmt(p.total)}</div>
                  <span className={`chip chip-${p.status==="Paid"?"green":p.status==="Partial"?"amber":"red"}`}>{p.status}</span>
                  {p.total-p.paid>0&&<div style={{fontSize:11,color:"var(--red)"}}>Due: {fmt(p.total-p.paid)}</div>}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function Inventory({inventory,setInventory,showToast}){
  const [showModal,setShowModal]=useState(false);
  const [search,setSearch]=useState("");
  const [form,setForm]=useState({name:"",category:"Banarasi Silk",qty:"",mrp:"",cost:""});
  const filtered=inventory.filter(i=>i.name.toLowerCase().includes(search.toLowerCase())||i.category.toLowerCase().includes(search.toLowerCase()));
  const totalMRP=inventory.reduce((s,i)=>s+i.qty*i.mrp,0);
  const totalCost=inventory.reduce((s,i)=>s+i.qty*i.cost,0);
  const handleSave=()=>{
    if(!form.name.trim()||!form.qty||!form.mrp){showToast("Fill required fields","error");return;}
    if(inventory.find(i=>i.name.toLowerCase()===form.name.trim().toLowerCase())){showToast("Item already exists","error");return;}
    setInventory(prev=>[...prev,{id:Date.now(),name:form.name.trim(),category:form.category,qty:parseInt(form.qty),mrp:parseFloat(form.mrp),cost:parseFloat(form.cost||0)}]);
    setShowModal(false);showToast("Item added!");setForm({name:"",category:"Banarasi Silk",qty:"",mrp:"",cost:""});
  };
  return(
    <div className="page fade-up">
      {inventory.length>0&&<div className="hero-card" style={{marginBottom:14}}><div className="hero-label">Stock Value at MRP</div><div className="hero-amount">{fmt(totalMRP)}</div><div className="hero-sub">Cost {fmt(totalCost)}  ·  Margin {fmt(totalMRP-totalCost)}</div></div>}
      {inventory.length>0&&<div className="search-bar"><span>🔍</span><input placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)}/></div>}
      {filtered.length===0&&inventory.length===0
        ?<EmptyState icon="🛍️" title="No stock yet" sub="Tap + to add your first saree" action={()=>setShowModal(true)} actionLabel="+ Add First Item"/>
        :filtered.map(item=>(
          <div key={item.id} className="inv-card fade-up">
            <div className="inv-initial">{item.name.slice(0,2).toUpperCase()}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14}}>{item.name}</div>
              <div style={{fontSize:12,color:"var(--ink2)"}}>{item.category}</div>
              <div style={{display:"flex",gap:8,marginTop:4,flexWrap:"wrap",alignItems:"center"}}>
                <span style={{fontSize:13,fontWeight:700,color:"var(--ink)"}}>{fmt(item.mrp)}</span>
                {item.cost>0&&<span style={{fontSize:11,color:"var(--ink2)"}}>Cost: {fmt(item.cost)}</span>}
                <span className={`chip ${item.qty<=5?"chip-red":item.qty<=10?"chip-amber":"chip-green"}`}>{item.qty<=5?"Critical":item.qty<=10?"Low":"In Stock"}</span>
              </div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div className={`inv-qty ${item.qty<=5?"stat-red":item.qty<=10?"stat-amber":"stat-green"}`}>{item.qty}</div>
              <div style={{fontSize:10,color:"var(--ink2)"}}>pcs</div>
            </div>
          </div>
        ))
      }
      <button className="fab" onClick={()=>setShowModal(true)}>+</button>
      {showModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target.className==="modal-overlay")setShowModal(false)}}>
          <div className="modal">
            <div className="modal-handle"/>
            <div className="modal-title">Add Item</div>
            <div className="form-group"><label className="form-label">Item Name *</label><input className="form-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Kanjivaram Peacock Blue"/></div>
            <div className="form-group"><label className="form-label">Category</label><select className="form-input form-select" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>{SAREE_TYPES.map(t=><option key={t}>{t}</option>)}</select></div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Qty *</label><input type="number" className="form-input" min={0} value={form.qty} onChange={e=>setForm(f=>({...f,qty:e.target.value}))}/></div>
              <div className="form-group"><label className="form-label">MRP (₹) *</label><input type="number" className="form-input" value={form.mrp} onChange={e=>setForm(f=>({...f,mrp:e.target.value}))}/></div>
            </div>
            <div className="form-group"><label className="form-label">Cost Price (₹)</label><input type="number" className="form-input" value={form.cost} onChange={e=>setForm(f=>({...f,cost:e.target.value}))} placeholder="Optional"/></div>
            <button className="btn-primary" onClick={handleSave}>Add to Stock ✓</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Customers({customers,setCustomers,bills,showToast}){
  const [showModal,setShowModal]=useState(false);
  const [selected,setSelected]=useState(null);
  const [search,setSearch]=useState("");
  const [form,setForm]=useState({name:"",phone:"",city:""});
  const filtered=customers.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())||c.phone.includes(search));
  const custBills=name=>bills.filter(b=>b.customer===name);
  const custDue=name=>custBills(name).reduce((s,b)=>s+(b.total-b.paid),0);
  const custTotal=name=>custBills(name).reduce((s,b)=>s+b.total,0);
  const handleSave=()=>{
    if(!form.name.trim()){showToast("Enter customer name","error");return;}
    if(form.phone&&customers.find(c=>c.phone===form.phone.trim())){showToast("Phone already registered","error");return;}
    setCustomers(prev=>[...prev,{id:Date.now(),name:form.name.trim(),phone:form.phone.trim(),city:form.city.trim()}]);
    setShowModal(false);showToast("Customer added!");setForm({name:"",phone:"",city:""});
  };
  if(selected){
    const c=customers.find(x=>x.id===selected);
    const cb=custBills(c.name);
    const due=custDue(c.name);
    return(
      <div className="page fade-up">
        <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",cursor:"pointer",color:"var(--ink2)",fontWeight:500,fontSize:13,marginBottom:14,fontFamily:"'Inter',sans-serif"}}>← Back</button>
        <div className="card" style={{marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div className="party-avatar">{c.name[0].toUpperCase()}</div>
            <div><div style={{fontSize:18,fontWeight:700}}>{c.name}</div><div style={{fontSize:13,color:"var(--ink2)"}}>{c.phone||"No phone"}{c.city?` · ${c.city}`:""}</div></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:14}}>
            {[{label:"Total Spent",value:fmt(custTotal(c.name)),color:"var(--ink)"},{label:"Visits",value:cb.length,color:"var(--blue)"},{label:"Credit Due",value:fmt(due),color:due>0?"var(--red)":"var(--green)"}].map(s=>(
              <div key={s.label} style={{background:"var(--bg)",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
                <div style={{fontSize:10,color:"var(--ink2)",marginBottom:2}}>{s.label}</div>
                <div style={{fontSize:15,fontWeight:700,color:s.color}}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="section-title" style={{marginBottom:10}}>Purchase History</div>
        {cb.length===0
          ?<EmptyState icon="🧾" title="No purchases yet" sub="Bills for this customer will appear here"/>
          :cb.map(b=>(
            <div key={b.id} className="card fade-up" style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{fontWeight:700,fontSize:14}}>Bill #{b.id} · {b.date}</div>
                  <div style={{fontSize:12,color:"var(--ink2)",marginTop:2}}>{b.items.map(i=>i.name).join(", ")}</div>
                  <span className={`chip chip-${b.payMode==="Cash"?"green":b.payMode==="UPI"?"blue":b.payMode==="Card"?"amber":"red"}`} style={{marginTop:5,display:"inline-block"}}>{b.payMode}</span>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontWeight:700,fontSize:16,color:"var(--green)"}}>{fmt(b.total)}</div>
                  <span className={`chip chip-${b.status==="Paid"?"green":b.status==="Partial"?"amber":"red"}`}>{b.status}</span>
                  {b.total-b.paid>0&&<div style={{fontSize:11,color:"var(--red)",marginTop:2}}>Due: {fmt(b.total-b.paid)}</div>}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
  return(
    <div className="page fade-up">
      {customers.length>0&&<div className="search-bar"><span>🔍</span><input placeholder="Search by name or phone…" value={search} onChange={e=>setSearch(e.target.value)}/></div>}
      {customers.some(c=>custDue(c.name)>0)&&(
        <div className="card" style={{marginBottom:12,borderColor:"var(--red-bg)",background:"var(--red-bg)"}}>
          <div style={{fontSize:12,fontWeight:600,color:"var(--red)",marginBottom:10}}>Credit Outstanding</div>
          {customers.filter(c=>custDue(c.name)>0).map(c=>(
            <div key={c.id} className="list-row" onClick={()=>setSelected(c.id)} style={{cursor:"pointer"}}>
              <div className="party-avatar" style={{width:34,height:34,fontSize:14}}>{c.name[0].toUpperCase()}</div>
              <div className="row-main"><div className="row-name">{c.name}</div><div className="row-sub">{c.phone}</div></div>
              <div className="row-amount stat-red">{fmt(custDue(c.name))}</div>
            </div>
          ))}
        </div>
      )}
      {filtered.length===0&&customers.length===0
        ?<EmptyState icon="👥" title="No customers yet" sub="Add regular customers to track purchases and credit" action={()=>setShowModal(true)} actionLabel="+ Add First Customer"/>
        :<>
          <div className="section-title" style={{marginBottom:10}}>All Customers ({customers.length})</div>
          {filtered.map(c=>(
            <div key={c.id} className="card fade-up" style={{marginBottom:8,cursor:"pointer"}} onClick={()=>setSelected(c.id)}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div className="party-avatar">{c.name[0].toUpperCase()}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:15}}>{c.name}</div>
                  <div style={{fontSize:12,color:"var(--ink2)"}}>{c.phone||"No phone"}{c.city?` · ${c.city}`:""}</div>
                  <div style={{fontSize:11,color:"var(--ink2)",marginTop:2}}>{custBills(c.name).length} visit{custBills(c.name).length!==1?"s":""} · {fmt(custTotal(c.name))}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  {custDue(c.name)>0
                    ?<><div style={{fontWeight:700,fontSize:14,color:"var(--red)"}}>{fmt(custDue(c.name))}</div><div style={{fontSize:10,color:"var(--ink2)"}}>Due</div></>
                    :<span className="chip chip-green">✓ Clear</span>
                  }
                </div>
              </div>
            </div>
          ))}
        </>
      }
      <button className="fab" onClick={()=>setShowModal(true)}>+</button>
      {showModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target.className==="modal-overlay")setShowModal(false)}}>
          <div className="modal">
            <div className="modal-handle"/>
            <div className="modal-title">Add Customer</div>
            <div className="form-group"><label className="form-label">Name *</label><input className="form-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Customer's full name"/></div>
            <div className="form-group"><label className="form-label">Phone</label><input type="tel" className="form-input" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+91 XXXXX XXXXX"/></div>
            <div className="form-group"><label className="form-label">City</label><input className="form-input" value={form.city} onChange={e=>setForm(f=>({...f,city:e.target.value}))} placeholder="e.g. Varanasi"/></div>
            <button className="btn-primary" onClick={handleSave}>Add Customer ✓</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Reports({bills,inventory,purchases,totalSales,totalCollected,outstanding,totalPurchases}){
  const grossProfit = totalSales - totalPurchases;
  const totalGST    = bills.reduce((s,b) => s + (b.gst || 0), 0);
  const totalDisc   = bills.reduce((s,b) => s + (b.discAmt || 0), 0);

  const modeBreak = PAY_MODES.map(m => ({
    mode:  m,
    total: bills.filter(b => b.payMode === m).reduce((s,b) => s + (b.paid || 0), 0),
    count: bills.filter(b => b.payMode === m).length,
  })).filter(m => m.count > 0);
  const maxMode = modeBreak.length > 0 ? Math.max(...modeBreak.map(m => m.total), 1) : 1;

  const catSales = {};
  bills.forEach(b => (b.items || []).forEach(it => {
    const inv = inventory.find(i => i.name === it.name);
    const cat = inv?.category || "Other";
    catSales[cat] = (catSales[cat] || 0) + (it.mrp * it.qty * (1 - (it.discount || 0) / 100));
  }));
  const catEntries = Object.entries(catSales).sort((a, b) => b[1] - a[1]);
  const maxCat = catEntries.length > 0 ? Math.max(...catEntries.map(e => e[1]), 1) : 1;

  const walkInBills   = bills.filter(b => b.customer === "Walk-in Customer");
  const regBills      = bills.filter(b => b.customer !== "Walk-in Customer");
  const walkInSales   = walkInBills.reduce((s,b) => s + b.total, 0);
  const regSales      = regBills.reduce((s,b)    => s + b.total, 0);

  const stockItems    = SAREE_TYPES.map(cat => {
    const items = inventory.filter(i => i.category === cat);
    if (!items.length) return null;
    return { cat, val: items.reduce((s,i) => s + i.qty * i.mrp, 0), pcs: items.reduce((s,i) => s + i.qty, 0) };
  }).filter(Boolean);

  const hasAnyData = bills.length > 0 || inventory.length > 0;

  if (!hasAnyData) return (
    <div className="page fade-up">
      <EmptyState icon="📊" title="No data yet" sub="Reports appear once you add stock and start billing"/>
    </div>
  );

  return (
    <div className="page fade-up">
      {/* Hero */}
      <div className="hero-card" style={{marginBottom:14}}>
        <div className="hero-label">Gross Profit (Est.)</div>
        <div className="hero-amount">{fmt(grossProfit)}</div>
        <div className="hero-sub">Sales {fmt(totalSales)}  ·  Purchases {fmt(totalPurchases)}</div>
      </div>

      {/* P&L */}
      <div className="card" style={{marginBottom:12}}>
        <div style={{fontSize:13,fontWeight:600,marginBottom:14}}>Profit & Loss</div>
        {[
          {label:"Total Sales (incl. GST)", value:totalSales,     color:"var(--green)"},
          {label:"GST Collected",           value:totalGST,       color:"var(--ink2)"},
          {label:"Discounts Given",         value:totalDisc,      color:"var(--amber)"},
          {label:"Stock Purchases",         value:totalPurchases, color:"var(--red)"},
          {label:"Gross Profit",            value:grossProfit,    color:"var(--ink)"},
          {label:"Cash Collected",          value:totalCollected, color:"var(--green)"},
          {label:"Credit Outstanding",      value:outstanding,    color:"var(--red)"},
        ].map(r => (
          <div key={r.label} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid var(--border)"}}>
            <span style={{fontSize:13,color:"var(--ink2)"}}>{r.label}</span>
            <span style={{fontWeight:600,fontSize:13,color:r.color}}>{fmt(r.value)}</span>
          </div>
        ))}
      </div>

      {/* Customer split */}
      {bills.length > 0 && (
        <div className="card" style={{marginBottom:12}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Customer Split</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div style={{background:"var(--bg)",borderRadius:9,padding:"12px",textAlign:"center"}}>
              <div style={{fontSize:11,color:"var(--ink2)",marginBottom:4}}>WALK-IN</div>
              <div style={{fontSize:18,fontWeight:700,letterSpacing:"-.5px"}}>{fmt(walkInSales)}</div>
              <div style={{fontSize:11,color:"var(--ink2)",marginTop:2}}>{walkInBills.length} bill{walkInBills.length!==1?"s":""}</div>
            </div>
            <div style={{background:"var(--bg)",borderRadius:9,padding:"12px",textAlign:"center"}}>
              <div style={{fontSize:11,color:"var(--ink2)",marginBottom:4}}>REGISTERED</div>
              <div style={{fontSize:18,fontWeight:700,letterSpacing:"-.5px",color:"var(--blue)"}}>{fmt(regSales)}</div>
              <div style={{fontSize:11,color:"var(--ink2)",marginTop:2}}>{regBills.length} bill{regBills.length!==1?"s":""}</div>
            </div>
          </div>
        </div>
      )}

      {/* Collections by mode */}
      {modeBreak.length > 0 && (
        <div className="card" style={{marginBottom:12}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:14}}>Collections by Mode</div>
          {modeBreak.map(m => (
            <div key={m.mode} className="bar-row">
              <div className="bar-label">
                <span style={{color:"var(--ink)"}}>{m.mode} <span style={{color:"var(--ink3)",fontSize:11}}>({m.count})</span></span>
                <span style={{fontWeight:600,color:"var(--ink)"}}>{fmt(m.total)}</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{width:`${Math.round((m.total/maxMode)*100)}%`}}/>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sales by category */}
      {catEntries.length > 0 && (
        <div className="card" style={{marginBottom:12}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:14}}>Sales by Category</div>
          {catEntries.map(([cat,val]) => (
            <div key={cat} className="bar-row">
              <div className="bar-label">
                <span style={{fontSize:13,color:"var(--ink)"}}>{cat}</span>
                <span style={{fontWeight:600,color:"var(--ink)"}}>{fmt(val)}</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{width:`${Math.round((val/maxCat)*100)}%`}}/>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stock value */}
      {stockItems.length > 0 && (
        <div className="card" style={{marginBottom:12}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Current Stock Value</div>
          {stockItems.map(({cat,val,pcs}) => (
            <div key={cat} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
              <span style={{fontSize:13,color:"var(--ink)"}}>{cat} <span style={{color:"var(--ink2)",fontSize:11}}>({pcs} pcs)</span></span>
              <span style={{fontWeight:600,fontSize:13,color:"var(--ink)"}}>{fmt(val)}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{textAlign:"center",fontSize:11,color:"var(--ink3)",padding:"8px 0 4px"}}>
        Baba Vishwanath Silk Saree Factory · Varanasi
      </div>
    </div>
  );
}
