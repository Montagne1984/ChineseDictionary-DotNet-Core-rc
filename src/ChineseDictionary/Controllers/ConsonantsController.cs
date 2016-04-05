using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.Data.Entity;
using ChineseDictionary.Models;

namespace ChineseDictionary.Controllers
{
    public class ConsonantsController : Controller
    {
        private ApplicationDbContext _context;

        public ConsonantsController(ApplicationDbContext context)
        {
            _context = context;    
        }

        // GET: Consonants
        public async Task<IActionResult> Index()
        {
            return View(await _context.Consonants.ToListAsync());
        }

        // GET: Consonants/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            Consonant consonant = await _context.Consonants.SingleAsync(m => m.Id == id);
            if (consonant == null)
            {
                return HttpNotFound();
            }

            return View(consonant);
        }

        // GET: Consonants/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Consonants/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Consonant consonant)
        {
            if (ModelState.IsValid)
            {
                _context.Consonants.Add(consonant);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(consonant);
        }

        // GET: Consonants/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            Consonant consonant = await _context.Consonants.SingleAsync(m => m.Id == id);
            if (consonant == null)
            {
                return HttpNotFound();
            }
            return View(consonant);
        }

        // POST: Consonants/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Consonant consonant)
        {
            if (ModelState.IsValid)
            {
                _context.Update(consonant);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(consonant);
        }

        // GET: Consonants/Delete/5
        [ActionName("Delete")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            Consonant consonant = await _context.Consonants.SingleAsync(m => m.Id == id);
            if (consonant == null)
            {
                return HttpNotFound();
            }

            return View(consonant);
        }

        // POST: Consonants/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            Consonant consonant = await _context.Consonants.SingleAsync(m => m.Id == id);
            _context.Consonants.Remove(consonant);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
