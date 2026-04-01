/* ============================================================
   CTS Operations Portal — Prototype App Logic
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // ---- Sidebar Navigation ----
  const navLinks = document.querySelectorAll('.sidebar-nav a[data-page]');
  const pages = document.querySelectorAll('.page');
  const pageTitle = document.getElementById('page-title');

  function showPage(id) {
    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(a => a.classList.remove('active'));
    const target = document.getElementById(id);
    const link = document.querySelector(`.sidebar-nav a[data-page="${id}"]`);
    if (target) target.classList.add('active');
    if (link) {
      link.classList.add('active');
      pageTitle.textContent = link.dataset.title || 'Dashboard';
    }
    // Close mobile sidebar
    document.querySelector('.sidebar').classList.remove('open');
  }

  navLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      showPage(a.dataset.page);
    });
  });

  // ---- Mobile Menu Toggle ----
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  // ---- Parcel Tracking Simulation ----
  const trackBtn = document.getElementById('track-btn');
  const trackInput = document.getElementById('track-input');
  const trackResult = document.getElementById('tracking-result');

  if (trackBtn) {
    trackBtn.addEventListener('click', () => {
      const ref = trackInput.value.trim();
      if (!ref) { trackInput.focus(); return; }
      // Simulate tracking
      trackResult.classList.add('show');
      trackResult.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <div>
            <div style="font-size:.72rem;opacity:.6">CONSIGNMENT</div>
            <div style="font-size:1.1rem;font-weight:700">${ref.toUpperCase()}</div>
          </div>
          <span class="badge-status badge-transit" style="color:var(--white);background:rgba(80,230,255,.2)">In Transit</span>
        </div>
        <div style="display:flex;gap:24px;margin-bottom:16px;font-size:.78rem;opacity:.7">
          <span>&#x1F4E6; 2.4 kg</span>
          <span>&#x1F4CD; Blantyre → Lilongwe</span>
          <span>&#x1F4C5; ETA: Tomorrow 2:00 PM</span>
        </div>
        <div class="tracking-timeline">
          <div class="tl-step">
            <div class="tl-dot done">&#x2713;</div>
            <div class="tl-content"><h4>Picked Up</h4><span>1 Apr 2026, 8:15 AM — Blantyre Branch</span></div>
          </div>
          <div class="tl-step">
            <div class="tl-dot done">&#x2713;</div>
            <div class="tl-content"><h4>Processing</h4><span>1 Apr 2026, 9:40 AM — Sorted at Blantyre Hub</span></div>
          </div>
          <div class="tl-step">
            <div class="tl-dot current">&#x25CF;</div>
            <div class="tl-content"><h4>In Transit</h4><span>1 Apr 2026, 11:20 AM — Departed Blantyre Hub</span></div>
          </div>
          <div class="tl-step">
            <div class="tl-dot"></div>
            <div class="tl-content"><h4>Arrived at Destination Branch</h4><span>Pending — Lilongwe Branch</span></div>
          </div>
          <div class="tl-step">
            <div class="tl-dot"></div>
            <div class="tl-content"><h4>Delivered</h4><span>Pending</span></div>
          </div>
        </div>`;
    });
    trackInput.addEventListener('keydown', e => { if (e.key === 'Enter') trackBtn.click(); });
  }

  // ---- Service Desk: New Ticket ----
  const ticketForm = document.getElementById('new-ticket-form');
  if (ticketForm) {
    ticketForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Ticket #TKT-2026-0048 created successfully.\n\nIn the live system, this would be routed to the appropriate department with SLA tracking enabled.');
      ticketForm.reset();
    });
  }

  // ---- Booking Form ----
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Booking request submitted.\n\nReference: BKG-2026-0112\nPickup scheduled for the selected date.\n\nIn the live system, this triggers a confirmation SMS and assigns a pickup driver.');
      bookingForm.reset();
    });
  }

  // ---- Chart Bars Animation ----
  function animateBars() {
    document.querySelectorAll('.chart-bar[data-h]').forEach(bar => {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        bar.style.height = bar.dataset.h;
      }
    });
  }
  window.addEventListener('scroll', animateBars);
  setTimeout(animateBars, 300);

  // ---- Init: show dashboard ----
  showPage('page-dashboard');
});
