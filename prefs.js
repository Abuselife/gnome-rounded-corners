import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class extends ExtensionPreferences {
  fillPreferencesWindow(window) {
    let settings = window._settings = this.getSettings();

    const page = new Adw.PreferencesPage();

    const group = new Adw.PreferencesGroup({ title: "General settings" });

    let hbox = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL, spacing: 20 })
    let label = new Gtk.Label({ label: '', use_markup: true })
    function updateLabel(val) { label.set_markup(`Border radius:\n<small>${val}px</small>`) }
    let scale = new Gtk.Scale({
      orientation: Gtk.Orientation.HORIZONTAL,
      hexpand: true,
      digits: 0,
      adjustment: new Gtk.Adjustment({ lower: 4, upper: 32, step_increment: 1 }),
      value_pos: Gtk.PositionType.RIGHT,
      round_digits: 0
    })
    scale.connect('value-changed', (sw) => {
      let newVal = sw.get_value()
      if (newVal == settings.get_int('corner-radius')) return
      settings.set_int('corner-radius', newVal)
      updateLabel(newVal);
    })

    let val = settings.get_int('corner-radius')
    updateLabel(val)
    scale.set_value(val)
    hbox.append(label)
    hbox.append(scale)

    hbox.append(new Gtk.Label({ label: '\n' }))

    let extra_corners = new Gtk.CheckButton({ label: 'Extra Corners' })

    extra_corners.connect('toggled', (sw) => {
      let newVal = sw.get_active()
      settings.set_boolean('extra-corners', newVal)
    })

    let corner_val = settings.get_boolean('extra-corners')
    extra_corners.set_active(corner_val)

    hbox.append(extra_corners)
    

    group.add(hbox)
    page.add(group)
    window.add(page)
  }
}

