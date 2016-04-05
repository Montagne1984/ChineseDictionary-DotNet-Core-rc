using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.Data.Entity;
using ChineseDictionary.Models;
using ChineseDictionary.ViewModels.Tones;

namespace ChineseDictionary.Controllers
{
    public class TonesController : Controller
    {
        private ApplicationDbContext _context;

        public TonesController(ApplicationDbContext context)
        {
            _context = context;    
        }

        // GET: Tones
        public async Task<IActionResult> Index()
        {
            return View(await _context.Tones.Include(m => m.Area).Include(m => m.ToneType).ToListAsync());
        }

        // GET: Tones/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            Tone tone = await _context.Tones.SingleAsync(m => m.Id == id);
            if (tone == null)
            {
                return HttpNotFound();
            }

            return View(tone);
        }

        // GET: Tones/Create
        public IActionResult Create()
        {
            ViewBag.Areas = _context.Areas;
            ViewBag.ToneTypes = _context.ToneTypes;
            return View();
        }

        // POST: Tones/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CreateToneViewModel model)
        {
            if (ModelState.IsValid)
            {
                var area = await _context.Areas.SingleAsync(m => m.Id == model.AreaId);
                if (area == null)
                {
                    return HttpNotFound();
                }
                var toneType = await _context.ToneTypes.SingleAsync(m => m.Id == model.ToneTypeId);
                if (toneType == null)
                {
                    return HttpNotFound();
                }
                _context.Tones.Add(new Tone { Area = area, ToneType = toneType, Value = model.Value });
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(model);
        }

        // GET: Tones/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            var tone = await _context.Tones.Include(m => m.Area).Include(m => m.ToneType).SingleAsync(m => m.Id == id);
            if (tone == null)
            {
                return HttpNotFound();
            }
            ViewBag.Areas = _context.Areas;
            ViewBag.ToneTypes = _context.ToneTypes;
            return View(new EditToneViewModel { Id = tone.Id, AreaId = tone.Area.Id, ToneTypeId = tone.ToneType.Id, Value = tone.Value });
        }

        // POST: Tones/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(EditToneViewModel model)
        {
            if (ModelState.IsValid)
            {
                var tone = await _context.Tones.SingleAsync(m => m.Id == model.Id);
                if (tone == null)
                {
                    return HttpNotFound();
                }
                var area = await _context.Areas.SingleAsync(m => m.Id == model.AreaId);
                if (area == null)
                {
                    return HttpNotFound();
                }
                var toneType = await _context.ToneTypes.SingleAsync(m => m.Id == model.ToneTypeId);
                if (toneType == null)
                {
                    return HttpNotFound();
                }
                tone.Area = area;
                tone.ToneType = toneType;
                tone.Value = model.Value;
                _context.Update(tone);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(model);
        }

        // GET: Tones/Delete/5
        [ActionName("Delete")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return HttpNotFound();
            }

            Tone tone = await _context.Tones.Include(m => m.Area).Include(m => m.ToneType).SingleAsync(m => m.Id == id);
            if (tone == null)
            {
                return HttpNotFound();
            }

            return View(tone);
        }

        // POST: Tones/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            Tone tone = await _context.Tones.SingleAsync(m => m.Id == id);
            _context.Tones.Remove(tone);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
