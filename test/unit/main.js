(function (Gonfalon) {
    QUnit.module('Unit');
    QUnit.test('gonfalon.js tests', function (assert) {
        var flags, cell, mask;

        flags = new Gonfalon(['LIVE', 'DEAD', 'LIVE_NEXT', 'DEAD_NEXT', 'LIVE_LAST', 'DEAD_LAST']);

        assert.strictEqual(flags.value('LIVE'), 1, 'Values provided to the constructor should be assigned a primitive starting at 1');
        assert.strictEqual(flags.value('DEAD_NEXT'), 8, 'Values should be ascending powers of 2');

        cell = flags.mask(['DEAD']);

        assert.strictEqual(cell.value(), flags.value('DEAD'), 'A single mask value should be equal to the flag value');

        assert.strictEqual(cell.has('DEAD'), true, 'Mask#has should return true for values in the mask');
        assert.strictEqual(cell.has('DEAD_LAST'), false, 'Mask#has should return false for values not in the mask');

        mask = flags.mask(['DEAD_LAST', 'LIVE_NEXT']);
        assert.strictEqual(mask.value(), flags.value('DEAD_LAST') | flags.value('LIVE_NEXT'), "Mask#value should be the or'd value of flag mask values");

        cell.or(mask);

        assert.strictEqual(cell.has('LIVE'), false, "Values not or'd into the mask should still be false");
        assert.strictEqual(cell.has('DEAD'), true, 'Values previously in the mask should still be true');
        assert.strictEqual(cell.has('LIVE_NEXT'), true, "Values or'd into the mask should now be true");

        cell.toggle(mask);

        assert.strictEqual(cell.has('LIVE'), false, 'Values not in the toggled mask should remain unchanged');
        assert.strictEqual(cell.has('DEAD'), true, 'Values not in the toggled mask should remain unchanged');
        assert.strictEqual(cell.has('LIVE_NEXT'), false, 'Values in the toggled mask should be inverted');

        mask = flags.mask('DEAD', 'DEAD_NEXT');
        assert.strictEqual(mask.has('DEAD'), true, 'Gonfalon#mask should take comma-separated arguments as flags');
        assert.strictEqual(mask.has('DEAD_NEXT'), true, 'All values passed to Gonfalon#mask should be in the bitmask');
        assert.strictEqual(mask.has('LIVE'), false, 'Values not passed to Gonfalon#mask should not be in the mask');

        assert.strictEqual((new Gonfalon('LIVE', 'DEAD')).value('DEAD'), 2, 'Gonfalon can also be constructed with comma-separated values');

        mask.or('LIVE');
        assert.strictEqual(mask.has('LIVE'), true, "Single values can be or'd on");

        mask.or('LIVE');
        assert.strictEqual(mask.has('LIVE'), true, "or'd on values stay on");

        mask.nand('LIVE');
        assert.strictEqual(mask.has('LIVE'), false, "Single values can be nand'd off");

        mask.nand('LIVE');
        assert.strictEqual(mask.has('LIVE'), false, "nand'ing an off value stays off");

        mask.toggle('LIVE');
        assert.strictEqual(mask.has('LIVE'), true, 'Single values can also be toggled');
    });
}(window.Gonfalon));
