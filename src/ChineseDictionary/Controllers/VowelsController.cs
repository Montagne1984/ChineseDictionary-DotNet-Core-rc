using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.Data.Entity;
using ChineseDictionary.Models;

namespace ChineseDictionary.Controllers
{
    public class VowelsController : Controller
    {
        private ApplicationDbContext _context;

        public VowelsController(ApplicationDbContext context)
        {
            _context = context;    
        }

        // GET: Vowels
        public async Task<IActionResult> Index()
        {
            return View(await _context.Vowels.ToListAsync());
        }

        // GET: Vowels/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            Vowel vowel = await _context.Vowels.SingleAsync(m => m.Id == id);
            if (vowel == null)
            {
                return HttpNotFound();
            }

            return View(vowel);
        }

        // GET: Vowels/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Vowels/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Vowel vowel)
        {
            if (ModelState.IsValid)
            {
                _context.Vowels.Add(vowel);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(vowel);
        }

        // GET: Vowels/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            Vowel vowel = await _context.Vowels.SingleAsync(m => m.Id == id);
            if (vowel == null)
            {
                return HttpNotFound();
            }
            return View(vowel);
        }

        // POST: Vowels/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Vowel vowel)
        {
            if (ModelState.IsValid)
            {
                _context.Update(vowel);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(vowel);
        }

        // GET: Vowels/Delete/5
        [ActionName("Delete")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            Vowel vowel = await _context.Vowels.SingleAsync(m => m.Id == id);
            if (vowel == null)
            {
                return HttpNotFound();
            }

            return View(vowel);
        }

        // POST: Vowels/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            Vowel vowel = await _context.Vowels.SingleAsync(m => m.Id == id);
            _context.Vowels.Remove(vowel);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
