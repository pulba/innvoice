let items = [
  { description: "Jasa Pembuatan Website", qty: 1, unit: "Project", price: 2000000 }
];

let isFitMode = true;

function rupiah(n) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(n) || 0);
}

function dateID(v) {
  if (!v) return "-";
  const d = new Date(v + "T00:00:00");
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function makeNumber(dateVal) {
  if (dateVal) {
    const parts = dateVal.split('-');
    if (parts.length === 3) {
      return `PD-${parts[2].padStart(2, '0')}${parts[1].padStart(2, '0')}${parts[0]}-001`;
    }
  }
  const d = new Date();
  return "PD-" + String(d.getDate()).padStart(2, '0') + String(d.getMonth() + 1).padStart(2, '0') + d.getFullYear() + "-001";
}

function updateInvoiceNumberFromDate() {
  const dateVal = document.getElementById('invoiceDate').value;
  if (!dateVal) return;
  const parts = dateVal.split('-');
  if (parts.length !== 3) return;
  const [year, month, day] = parts;
  const dateCode = day.padStart(2, '0') + month.padStart(2, '0') + year;

  const invEl = document.getElementById('invoiceNumber');
  const current = invEl.value.trim();
  const match = current.match(/^(.*?)(\d{8})(.*)$/);
  if (match) {
    invEl.value = match[1] + dateCode + match[3];
  } else if (!current) {
    invEl.value = `PD-${dateCode}-001`;
  } else {
    const suffixMatch = current.match(/(-[0-9]+)$/);
    const suffix = suffixMatch ? suffixMatch[1] : "-001";
    invEl.value = `PD-${dateCode}${suffix}`;
  }
}

function today() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, '0') + "-" + String(d.getDate()).padStart(2, '0');
}

function addDays(date, days) {
  const d = new Date(date + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, '0') + "-" + String(d.getDate()).padStart(2, '0');
}

function applyProjectPreset() {
  const type = document.getElementById('projectType').value;
  if (type === 'website') {
    document.getElementById('projectName').value = 'Pembuatan Website';
    items = [{ description: 'Jasa Pembuatan Website', qty: 1, unit: 'Project', price: 2000000 }];
  } else if (type === 'undangan') {
    document.getElementById('projectName').value = 'Undangan Digital';
    items = [{ description: 'Jasa Pembuatan Undangan Digital', qty: 1, unit: 'Project', price: 125000 }];
  } else {
    document.getElementById('projectName').value = 'Project Custom';
    items = [{ description: 'Jasa / Produk Custom', qty: 1, unit: 'Project', price: 0 }];
  }
  renderEditors();
  renderInvoice();
}

function addItem() {
  items.push({ description: 'Item baru', qty: 1, unit: 'Project', price: 0 });
  renderEditors();
  renderInvoice();
}

function removeItem(i) {
  items.splice(i, 1);
  renderEditors();
  renderInvoice();
}

function renderEditors() {
  const box = document.getElementById('itemsEditor');
  if (!box) return;
  box.innerHTML = '';
  items.forEach((it, i) => {
    box.innerHTML += `
  <div class="item-editor">
    <button type="button" class="danger remove" onclick="removeItem(${i})">Hapus</button>
    <label>Deskripsi</label>
    <input value="${escapeHTML(it.description)}" oninput="items[${i}].description=this.value;renderInvoice()">
    <div class="grid2">
      <div><label>Qty</label><input type="number" value="${it.qty}" oninput="items[${i}].qty=Number(this.value)||0;renderInvoice()"></div>
      <div><label>Satuan</label><input value="${escapeHTML(it.unit)}" oninput="items[${i}].unit=this.value;renderInvoice()"></div>
    </div>
    <label>Harga Satuan</label>
    <input type="number" value="${it.price}" oninput="items[${i}].price=Number(this.value)||0;renderInvoice()">
  </div>`;
  });
}

function escapeHTML(s) {
  return String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));
}

function renderInvoice() {
  const customer = document.getElementById('customerName').value;
  const company = document.getElementById('customerCompany').value;
  const address = document.getElementById('customerAddress').value;
  const phone = document.getElementById('customerPhone').value;
  const invoiceDate = document.getElementById('invoiceDate').value;
  const dueDate = document.getElementById('dueDate').value;
  const number = document.getElementById('invoiceNumber').value;
  const project = document.getElementById('projectName').value;
  const notes = document.getElementById('notes').value;
  const discount = Number(document.getElementById('discount').value) || 0;
  const adjustment = Number(document.getElementById('adjustment').value) || 0;
  let subtotal = 0;
  const body = document.getElementById('outItems');
  body.innerHTML = '';
  items.forEach(it => {
    const total = (Number(it.qty) || 0) * (Number(it.price) || 0);
    subtotal += total;
    body.innerHTML += `<tr><td>${escapeHTML(it.description)}</td><td class="num">${it.qty} ${escapeHTML(it.unit)}</td><td class="num">${rupiah(it.price)}</td><td class="num">${rupiah(total)}</td></tr>`;
  });
  const grand = subtotal - discount + adjustment;
  document.getElementById('outSubmitted').textContent = 'Submitted on ' + dateID(invoiceDate);
  document.getElementById('outCustomer').innerHTML = escapeHTML(customer) + '<br>' + escapeHTML(company) + '<br>' + escapeHTML(address).replace(/\n/g, '<br>') + '<br>' + escapeHTML(phone);
  document.getElementById('outProject').textContent = project || '-';
  document.getElementById('outNumber').textContent = number || '-';
  document.getElementById('outDue').textContent = dateID(dueDate);
  document.getElementById('outNotes').textContent = notes || '-';
  document.getElementById('outSubtotal').textContent = rupiah(subtotal);
  document.getElementById('outDiscount').textContent = discount ? '- ' + rupiah(discount) : '-';
  document.getElementById('outAdjustment').textContent = adjustment ? rupiah(adjustment) : '-';
  document.getElementById('outGrandTotal').textContent = rupiah(grand);

  // Update live totals in mobile badges
  const previewBadge = document.getElementById('previewTotalBadge');
  if (previewBadge) previewBadge.textContent = rupiah(grand);
  const jumpBtnTotal = document.getElementById('btnTotalText');
  if (jumpBtnTotal) jumpBtnTotal.textContent = rupiah(grand);

  updateInvoiceScale();
}

function collect() {
  return {
    customerName: document.getElementById('customerName').value,
    customerCompany: document.getElementById('customerCompany').value,
    customerAddress: document.getElementById('customerAddress').value,
    customerPhone: document.getElementById('customerPhone').value,
    invoiceNumber: document.getElementById('invoiceNumber').value,
    invoiceDate: document.getElementById('invoiceDate').value,
    dueDate: document.getElementById('dueDate').value,
    projectType: document.getElementById('projectType').value,
    projectName: document.getElementById('projectName').value,
    notes: document.getElementById('notes').value,
    discount: document.getElementById('discount').value,
    adjustment: document.getElementById('adjustment').value,
    items
  };
}

function saveData() {
  localStorage.setItem('pulbaInvoiceDraft', JSON.stringify(collect()));
  alert('Draft invoice berhasil tersimpan di browser.');
}

function loadData() {
  const raw = localStorage.getItem('pulbaInvoiceDraft');
  if (!raw) {
    alert('Belum ada draft tersimpan.');
    return;
  }
  const d = JSON.parse(raw);
  Object.keys(d).forEach(k => {
    const el = document.getElementById(k);
    if (el && k !== 'items') el.value = d[k];
  });
  items = d.items || [];
  renderEditors();
  renderInvoice();
}

async function downloadPNG() {
  const node = document.getElementById('invoice');
  const scaler = document.getElementById('invoiceScaler');
  const prevTransform = scaler ? scaler.style.transform : '';

  // Temporarily reset transform for crisp full-resolution A4 export
  if (scaler) {
    scaler.style.transform = 'none';
  }

  try {
    const canvas = await html2canvas(node, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false
    });
    const link = document.createElement('a');
    link.download = (document.getElementById('invoiceNumber').value || 'invoice') + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error('Download PNG failed:', err);
    alert('Gagal membuat gambar invoice. Silakan gunakan tombol Cetak / PDF.');
  } finally {
    if (scaler) {
      scaler.style.transform = prevTransform;
    }
  }
}

/* ----------------- MOBILE NAVIGATION & SCALING ----------------- */
function switchView(view) {
  const app = document.querySelector('.app');
  const tabEdit = document.getElementById('tabBtnEdit');
  const tabPreview = document.getElementById('tabBtnPreview');

  if (view === 'preview') {
    app.classList.remove('view-edit');
    app.classList.add('view-preview');
    if (tabEdit) tabEdit.classList.remove('active');
    if (tabPreview) tabPreview.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(updateInvoiceScale, 50);
  } else {
    app.classList.remove('view-preview');
    app.classList.add('view-edit');
    if (tabEdit) tabEdit.classList.add('active');
    if (tabPreview) tabPreview.classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function toggleScaleMode() {
  isFitMode = !isFitMode;
  const btn = document.getElementById('zoomToggleBtn');
  if (btn) {
    btn.textContent = isFitMode ? 'Fit Layar' : 'Ukuran 100%';
  }
  updateInvoiceScale();
}

function updateInvoiceScale() {
  const scaler = document.getElementById('invoiceScaler');
  const container = document.getElementById('stageContainer');
  const invoice = document.getElementById('invoice');
  if (!scaler || !container || !invoice) return;

  const targetWidth = 794;
  const stage = document.querySelector('.stage');
  const availableWidth = stage ? stage.clientWidth - 28 : window.innerWidth - 28;

  if (isFitMode && availableWidth < targetWidth) {
    const scale = Math.min(1, Math.max(0.3, availableWidth / targetWidth));
    scaler.style.transform = `scale(${scale})`;
    scaler.style.transformOrigin = 'top center';
    const scaledHeight = invoice.offsetHeight * scale;
    container.style.height = `${scaledHeight + 20}px`;
  } else {
    scaler.style.transform = 'none';
    container.style.height = 'auto';
  }
}

window.addEventListener('resize', () => {
  updateInvoiceScale();
});

document.querySelectorAll('input,textarea,select').forEach(el => {
  el.addEventListener('input', renderInvoice);
  el.addEventListener('change', renderInvoice);
});

const invoiceDateEl = document.getElementById('invoiceDate');
if (invoiceDateEl) {
  const handleDateChange = () => {
    updateInvoiceNumberFromDate();
    renderInvoice();
  };
  invoiceDateEl.addEventListener('input', handleDateChange);
  invoiceDateEl.addEventListener('change', handleDateChange);
}

const initialDate = today();
document.getElementById('invoiceDate').value = initialDate;
document.getElementById('dueDate').value = addDays(initialDate, 14);
document.getElementById('invoiceNumber').value = makeNumber(initialDate);

renderEditors();
renderInvoice();
updateInvoiceScale();