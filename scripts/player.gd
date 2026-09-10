extends CharacterBody2D

@export var speed: float = 190.0

@onready var sprite: Sprite2D = $Sprite

var facing := "down"
var bob_clock := 0.0

const FRAMES := {
	"down": Rect2(708, 252, 48, 74),
	"up": Rect2(768, 252, 50, 74),
	"left": Rect2(832, 252, 44, 74),
	"right": Rect2(894, 252, 46, 74),
}

func _physics_process(delta: float) -> void:
	var input_dir := Vector2.ZERO
	if Input.is_key_pressed(KEY_A) or Input.is_key_pressed(KEY_LEFT):
		input_dir.x -= 1.0
	if Input.is_key_pressed(KEY_D) or Input.is_key_pressed(KEY_RIGHT):
		input_dir.x += 1.0
	if Input.is_key_pressed(KEY_W) or Input.is_key_pressed(KEY_UP):
		input_dir.y -= 1.0
	if Input.is_key_pressed(KEY_S) or Input.is_key_pressed(KEY_DOWN):
		input_dir.y += 1.0

	input_dir = input_dir.normalized()
	velocity = input_dir * speed
	move_and_slide()

	position.x = clamp(position.x, 36.0, 1564.0)
	position.y = clamp(position.y, 56.0, 860.0)

	if input_dir != Vector2.ZERO:
		_update_facing(input_dir)
		bob_clock += delta * 11.0
		sprite.position.y = -1.5 if sin(bob_clock) > 0.0 else 0.0
	else:
		bob_clock = 0.0
		sprite.position.y = 0.0

func _update_facing(dir: Vector2) -> void:
	if abs(dir.x) > abs(dir.y):
		facing = "right" if dir.x > 0.0 else "left"
	else:
		facing = "down" if dir.y > 0.0 else "up"
	var rect: Rect2 = FRAMES[facing]
	sprite.region_rect = rect
	sprite.offset = Vector2(0, -rect.size.y / 2.0)
