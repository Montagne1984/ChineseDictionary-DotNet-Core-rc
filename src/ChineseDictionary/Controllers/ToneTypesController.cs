using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.Data.Entity;
using ChineseDictionary.Models;

namespace ChineseDictionary.Controllers
{
    public class ToneTypesController : Controller
    {
        private ApplicationDbContext _context;

        public ToneTypesController(ApplicationDbContext context)
        {
            _context = context;    
        }

        // GET: ToneTypes
        public async Task<IActionResult> Index()
        {
            return View(await _context.ToneTypes.ToListAsync());
        }

        // GET: ToneTypes/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            ToneType toneType = await _context.ToneTypes.SingleAsync(m => m.Id == id);
            if (toneType == null)
            {
                return HttpNotFound();
            }

            return View(toneType);
        }

        // GET: ToneTypes/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: ToneTypes/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ToneType toneType)
        {
            if (ModelState.IsValid)
            {
                _context.ToneTypes.Add(toneType);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(toneType);
        }

        // GET: ToneTypes/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            ToneType toneType = await _context.ToneTypes.SingleAsync(m => m.Id == id);
            if (toneType == null)
            {
                return HttpNotFound();
            }
            return View(toneType);
        }

        // POST: ToneTypes/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(ToneType toneType)
        {
            if (ModelState.IsValid)
            {
                _context.Update(toneType);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(toneType);
        }

        // GET: ToneTypes/Delete/5
        [ActionName("Delete")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            ToneType toneType = await _context.ToneTypes.SingleAsync(m => m.Id == id);
            if (toneType == null)
            {
                return HttpNotFound();
            }

            return View(toneType);
        }

        // POST: ToneTypes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            ToneType toneType = await _context.ToneTypes.SingleAsync(m => m.Id == id);
            _context.ToneTypes.Remove(toneType);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
