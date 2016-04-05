using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.Data.Entity;
using ChineseDictionary.Models;

namespace ChineseDictionary.Controllers
{
    public class AreasController : Controller
    {
        private ApplicationDbContext _context;

        public AreasController(ApplicationDbContext context)
        {
            _context = context;    
        }

        // GET: Areas
        public async Task<IActionResult> Index()
        {
            return View(await _context.Areas.ToListAsync());
        }

        // GET: Areas/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            Area area = await _context.Areas.SingleAsync(m => m.Id == id);
            if (area == null)
            {
                return HttpNotFound();
            }

            return View(area);
        }

        // GET: Areas/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Areas/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Area area)
        {
            if (ModelState.IsValid)
            {
                _context.Areas.Add(area);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(area);
        }

        // GET: Areas/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            Area area = await _context.Areas.SingleAsync(m => m.Id == id);
            if (area == null)
            {
                return HttpNotFound();
            }
            return View(area);
        }

        // POST: Areas/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Area area)
        {
            if (ModelState.IsValid)
            {
                _context.Update(area);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(area);
        }

        // GET: Areas/Delete/5
        [ActionName("Delete")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            Area area = await _context.Areas.SingleAsync(m => m.Id == id);
            if (area == null)
            {
                return HttpNotFound();
            }

            return View(area);
        }

        // POST: Areas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            Area area = await _context.Areas.SingleAsync(m => m.Id == id);
            _context.Areas.Remove(area);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
